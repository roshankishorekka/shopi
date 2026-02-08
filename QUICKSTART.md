# 🚀 Quick Start - Shopi E-Commerce

## FASTEST WAY TO GET STARTED (5 minutes)

### Step 1: MySQL Database (2 minutes)
```bash
# Option A: Use the SQL script (easiest)
mysql -u root -p < server/setup.sql

# Option B: Manual setup
mysql -u root -p
CREATE DATABASE shopi_db;
EXIT;
```

### Step 2: Configure Backend (.env)
```bash
cd server
# Edit .env file and set your MySQL password:
# DB_PASSWORD=your_mysql_root_password
```

### Step 3: Install & Seed (2 minutes)
```bash
# Install backend dependencies
cd server
npm install

# Create tables and seed products
npm run seed

# Create admin account (use defaults or customize)
npm run create-admin
# Recommended: email: admin@shopi.com, password: Admin@123
```

### Step 4: Run Application (1 minute)
```bash
# Terminal 1 - Backend (from server directory)
npm run dev

# Terminal 2 - Frontend (from project root)
cd ..
npm run dev
```

### Step 5: Access & Test
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Backend API**: http://localhost:5000/api/health

Login to admin with credentials from Step 3!

---

## Common Issues & Fixes

❌ **"Access denied for user 'root'@'localhost'"**
→ Update `server/.env` with correct MySQL password

❌ **"Cannot find module"**
→ Run `npm install` in both root and server directories

❌ **Port already in use**
→ Change PORT in `server/.env` or stop other services

❌ **Database connection error**
→ Ensure MySQL service is running: `net start MySQL80` (Windows)

---

## What You Can Do Now

### As Admin (go to /admin)
✅ Add new products with images
✅ Edit existing products
✅ Delete products
✅ View all orders
✅ Update order status
✅ See dashboard analytics

### As Customer
✅ Browse 10 pre-seeded products
✅ Search products
✅ Add to cart and wishlist
✅ Place orders (COD or Razorpay)
✅ View order history in profile

---

**Need More Help?** Check the full README.md for detailed documentation!
