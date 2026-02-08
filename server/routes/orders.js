import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/',
    protect,
    [
        body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
        body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
        body('paymentMethod').isIn(['COD', 'RAZORPAY']).withMessage('Invalid payment method')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { items, shippingAddress, paymentMethod, subtotal, shipping, tax, total } = req.body;

            // Generate order number
            const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Validate products exist and have stock
            for (const item of items) {
                const product = await Product.findByPk(item.productId);
                if (!product) {
                    return res.status(400).json({ message: `Product ${item.productId} not found` });
                }
                if (product.stock < item.quantity) {
                    return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
                }
            }

            let razorpayOrderId = null;
            let paymentStatus = 'PENDING';

            // Create Razorpay order if payment method is RAZORPAY
            if (paymentMethod === 'RAZORPAY') {
                const razorpayOrder = await razorpay.orders.create({
                    amount: Math.round(total * 100), // Amount in paise
                    currency: 'INR',
                    receipt: orderNumber,
                    notes: {
                        userId: req.user.id,
                        orderNumber
                    }
                });
                razorpayOrderId = razorpayOrder.id;
            } else if (paymentMethod === 'COD') {
                paymentStatus = 'PENDING'; // Will be marked as PAID on delivery
            }

            // Create order
            const order = await Order.create({
                orderNumber,
                userId: req.user.id,
                items,
                subtotal,
                shipping,
                tax,
                total,
                shippingAddress,
                paymentMethod,
                paymentStatus,
                razorpayOrderId,
                orderStatus: 'PENDING'
            });

            // Update product stock
            for (const item of items) {
                const product = await Product.findByPk(item.productId);
                await product.update({ stock: product.stock - item.quantity });
            }

            res.status(201).json({
                message: 'Order created successfully',
                order,
                razorpayOrderId,
                razorpayKeyId: process.env.RAZORPAY_KEY_ID // Send key for frontend
            });
        } catch (error) {
            console.error('Create order error:', error);
            res.status(500).json({ message: 'Failed to create order', error: error.message });
        }
    }
);

// @route   POST /api/orders/verify-payment
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify-payment', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderNumber } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Update order
        const order = await Order.findOne({ where: { orderNumber, userId: req.user.id } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = 'PAID';
        order.razorpayPaymentId = razorpay_payment_id;
        order.orderStatus = 'CONFIRMED';
        await order.save();

        res.json({
            message: 'Payment verified successfully',
            order
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ message: 'Payment verification failed', error: error.message });
    }
});

// @route   GET /api/orders/my-orders
// @desc    Get logged-in user's orders
// @access  Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error('Get my orders error:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
});

export default router;
