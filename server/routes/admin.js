import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// All routes require admin authentication
router.use(protect, admin);

// @route   GET /api/admin/products
// @desc    Get all products (including inactive)
// @access  Admin
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(products);
    } catch (error) {
        console.error('Admin get products error:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
});

// @route   POST /api/admin/products
// @desc    Create new product
// @access  Admin
router.post('/products',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'hoverImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 5 }
    ]),
    handleUploadError,
    [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('category').isIn(['Graphic', 'Basic', 'Hoodie', 'Outerwear', 'Bottoms', 'Accessories']).withMessage('Invalid category'),
        body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, description, price, category, stock, featured } = req.body;
            let { sizes } = req.body;

            // Parse sizes if it's a string
            if (typeof sizes === 'string') {
                sizes = JSON.parse(sizes);
            }

            // Handle file uploads
            const image = req.files?.image?.[0] ? `/uploads/products/${req.files.image[0].filename}` : null;
            const hoverImage = req.files?.hoverImage?.[0] ? `/uploads/products/${req.files.hoverImage[0].filename}` : null;
            const additionalImages = req.files?.additionalImages?.map(file => `/uploads/products/${file.filename}`) || [];

            if (!image) {
                return res.status(400).json({ message: 'Main product image is required' });
            }

            const product = await Product.create({
                name,
                description,
                price,
                category,
                image,
                hoverImage,
                additionalImages,
                sizes: sizes || ['S', 'M', 'L', 'XL'],
                stock,
                featured: featured === 'true' || featured === true,
                isActive: true
            });

            res.status(201).json({
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            console.error('Create product error:', error);
            res.status(500).json({ message: 'Failed to create product', error: error.message });
        }
    }
);

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Admin
router.put('/products/:id',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'hoverImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 5 }
    ]),
    handleUploadError,
    async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const { name, description, price, category, stock, featured, isActive } = req.body;
            let { sizes } = req.body;

            if (typeof sizes === 'string') {
                sizes = JSON.parse(sizes);
            }

            // Handle file uploads
            const updateData = {};
            if (req.files?.image?.[0]) updateData.image = `/uploads/products/${req.files.image[0].filename}`;
            if (req.files?.hoverImage?.[0]) updateData.hoverImage = `/uploads/products/${req.files.hoverImage[0].filename}`;
            if (req.files?.additionalImages) {
                updateData.additionalImages = req.files.additionalImages.map(file => `/uploads/products/${file.filename}`);
            }

            if (name) updateData.name = name;
            if (description) updateData.description = description;
            if (price) updateData.price = price;
            if (category) updateData.category = category;
            if (stock !== undefined) updateData.stock = stock;
            if (sizes) updateData.sizes = sizes;
            if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;
            if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;

            await product.update(updateData);

            res.json({
                message: 'Product updated successfully',
                product
            });
        } catch (error) {
            console.error('Update product error:', error);
            res.status(500).json({ message: 'Failed to update product', error: error.message });
        }
    }
);

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Admin
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Admin
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                association: 'customer',
                attributes: ['id', 'name', 'email', 'phone']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error('Admin get orders error:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/orders/:id/status', async (req, res) => {
    try {
        const { orderStatus, trackingNumber } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (orderStatus) order.orderStatus = orderStatus;
        if (trackingNumber) order.trackingNumber = trackingNumber;

        await order.save();

        res.json({
            message: 'Order updated successfully',
            order
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
});

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Admin
router.get('/stats', async (req, res) => {
    try {
        const totalProducts = await Product.count();
        const totalOrders = await Order.count();
        const pendingOrders = await Order.count({ where: { orderStatus: 'PENDING' } });

        const revenue = await Order.sum('total', { where: { paymentStatus: 'PAID' } }) || 0;

        res.json({
            totalProducts,
            totalOrders,
            pendingOrders,
            revenue: parseFloat(revenue).toFixed(2)
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
    }
});

export default router;
