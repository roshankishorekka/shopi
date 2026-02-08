import sequelize from '../config/database.js';
import Product from '../models/Product.js';
import { syncDatabase } from '../config/database.js';

const seedProducts = [
    {
        name: "Bollywood Shocker Tee",
        price: 1499,
        image: "/assets/product_bollywood_shocker.jpg",
        hoverImage: "/assets/product_bollywood_shocker_model.jpg",
        category: "Graphic",
        description: "Bold and expressive graphic tee featuring striking Bollywood-inspired artwork. Premium black cotton with vibrant print. Make a statement.",
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 50,
        featured: true
    },
    {
        name: "Floral Portrait Tee",
        price: 1499,
        image: "/assets/product_floral_portrait.jpg",
        hoverImage: "/assets/product_floral_portrait.jpg",
        category: "Graphic",
        description: "Elegant graphic tee showcasing a beautiful portrait adorned with marigold flowers and traditional elements. Black premium cotton.",
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 40,
        featured: true
    },
    {
        name: "Indian Goddess Tee",
        price: 1599,
        image: "/assets/product_indian_goddess.jpg",
        hoverImage: "/assets/product_indian_goddess.jpg",
        category: "Graphic",
        description: "Artistic tee featuring a vintage-inspired Indian goddess design with intricate details. Navy blue premium cotton for a sophisticated look.",
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 35,
        featured: false
    },
    {
        name: "Vintage Portrait Tee",
        price: 1549,
        image: "/assets/product_vintage_portrait.jpg",
        hoverImage: "/assets/product_vintage_portrait.jpg",
        category: "Graphic",
        description: "Contemporary art meets tradition. Black tee with a striking vintage collage design. Perfect for the modern cultural enthusiast.",
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 30,
        featured: false
    },
    {
        name: "Classic Black Tee",
        price: 999,
        image: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762709788630%20%281%29.jpg",
        hoverImage: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762709723731%20(1).jpg",
        category: "Basic",
        description: "A timeless classic. Made from 100% premium cotton, this black tee offers a perfect fit and unmatched comfort for everyday wear.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 100,
        featured: true
    },
    {
        name: "Vintage Graphic Tee",
        price: 1199,
        image: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762711181224%20(1)%20(1).jpg",
        hoverImage: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762711103631%20(1).jpg",
        category: "Graphic",
        description: "Express yourself with our vintage-inspired graphic tee. Featuring a unique design and soft, washed fabric for that lived-in feel.",
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 45,
        featured: false
    },
    {
        name: "Modern Fit Hoodie",
        price: 2499,
        image: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762709256643%20(1).jpg",
        hoverImage: "https://cdn.jsdelivr.net/gh/AbhishekBaske/clothcdn@main/1762709152289%20(1).jpg",
        category: "Hoodie",
        description: "Stay warm and stylish with our modern fit hoodie. Crafted with a premium blend of cotton and polyester for durability and comfort.",
        sizes: ['M', 'L', 'XL', 'XXL'],
        stock: 60,
        featured: true
    },
    {
        name: "Urban Street Jacket",
        price: 3999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Outerwear",
        description: "Navigate the city in style. This urban street jacket combines functionality with a sleek design, perfect for any weather.",
        sizes: ['M', 'L', 'XL'],
        stock: 25,
        featured: false
    },
    {
        name: "Premium Denim Jeans",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Bottoms",
        description: "Experience the perfect fit with our premium denim jeans. Durable, comfortable, and designed to last.",
        sizes: ['28', '30', '32', '34', '36'],
        stock: 70,
        featured: false
    },
    {
        name: "Signature Cap",
        price: 799,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Accessories",
        description: "Top off your look with our signature cap. Adjustable fit and breathable fabric make it an essential accessory.",
        sizes: ['One Size'],
        stock: 80,
        featured: false
    }
];

const runSeed = async () => {
    try {
        console.log('🌱 Starting database seed...');

        // Connect to database
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Sync database (create tables if they don't exist)
        await syncDatabase(false);

        // Clear existing products (optional - comment out to preserve existing data)
        // await Product.destroy({ where: {}, truncate: true });
        // console.log('🗑️  Cleared existing products');

        // Insert seed products
        const createdProducts = await Product.bulkCreate(seedProducts);
        console.log(`✅ Successfully seeded ${createdProducts.length} products`);

        console.log('\n📦 Seed Summary:');
        console.log(`   - Total Products: ${createdProducts.length}`);
        console.log(`   - Featured Products: ${seedProducts.filter(p => p.featured).length}`);
        console.log(`   - Categories: ${[...new Set(seedProducts.map(p => p.category))].join(', ')}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
};

runSeed();
