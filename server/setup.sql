-- Shopi Database Setup Script
-- Run this script to create the database and user

-- Create database
CREATE DATABASE IF NOT EXISTS shopi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE shopi_db;

-- Create user (optional - for better security)
-- Replace 'your_password' with a strong password
CREATE USER IF NOT EXISTS 'shopi_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON shopi_db.* TO 'shopi_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SELECT 'Database and user created successfully!' AS status;
SHOW DATABASES LIKE 'shopi_db';

-- Note: Tables will be automatically created by Sequelize when you run the server
-- The seed script will populate the database with initial data
