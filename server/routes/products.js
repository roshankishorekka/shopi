import express from 'express';
import Product from '../models/Product.js';
import { Op } from 'sequelize';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, featured, sort, limit, page } = req.query;

        // Build where clause
        const where = { isActive: true };

        if (category) {
            where.category = category;
        }

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
        }

        if (featured === 'true') {
            where.featured = true;
        }

        // Sorting
        let order = [['createdAt', 'DESC']]; // Default: newest first
        if (sort === 'price_asc') order = [['price', 'ASC']];
        if (sort === 'price_desc') order = [['price', 'DESC']];
        if (sort === 'name') order = [['name', 'ASC']];

        // Pagination
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 50;
        const offset = (pageNum - 1) * limitNum;

        const { count, rows: products } = await Product.findAndCountAll({
            where,
            order,
            limit: limitNum,
            offset
        });

        res.json({
            products,
            pagination: {
                total: count,
                page: pageNum,
                pages: Math.ceil(count / limitNum),
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                category: req.params.category,
                isActive: true
            },
            order: [['createdAt', 'DESC']]
        });

        res.json(products);
    } catch (error) {
        console.error('Get category products error:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
});

export default router;
