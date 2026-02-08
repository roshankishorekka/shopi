import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    category: {
        type: DataTypes.ENUM('Graphic', 'Basic', 'Hoodie', 'Outerwear', 'Bottoms', 'Accessories'),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'Main product image URL'
    },
    hoverImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Hover/alternate image URL'
    },
    additionalImages: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array of additional image URLs'
    },
    sizes: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ['S', 'M', 'L', 'XL'],
        comment: 'Available sizes'
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Display on homepage'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Product visibility'
    }
}, {
    tableName: 'products',
    timestamps: true,
    indexes: [
        { fields: ['category'] },
        { fields: ['featured'] },
        { fields: ['isActive'] }
    ]
});

export default Product;
