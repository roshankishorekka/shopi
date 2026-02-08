import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderNumber: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'Array of {productId, name, price, quantity, size, image}'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    shipping: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    tax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'Object with fullName, address, city, state, pincode, phone'
    },
    paymentMethod: {
        type: DataTypes.ENUM('COD', 'RAZORPAY', 'UPI', 'CARD'),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
        defaultValue: 'PENDING'
    },
    razorpayOrderId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    razorpayPaymentId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    orderStatus: {
        type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'),
        defaultValue: 'PENDING'
    },
    trackingNumber: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'orders',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['orderNumber'] },
        { fields: ['userId'] },
        { fields: ['orderStatus'] },
        { fields: ['paymentStatus'] }
    ]
});

// Define relationship
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

export default Order;
