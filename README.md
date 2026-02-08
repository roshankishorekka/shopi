# Shopi - Luxury Cloth Shopping E-Commerce Platform

Live luxury cloth shopping website with admin panel.

## 🚀 Quick Deploy

**No local setup needed!** Deploy directly to production:

### Backend (Railway - includes FREE MySQL)
1. Go to [Railway.app](https://railway.app)
2. Deploy from GitHub
3. Add MySQL database (automatic)
4. Set environment variables (see DEPLOY_PRODUCTION.md)
5. Deploy!

### Frontend (Vercel)
1. Go to [Vercel.com](https://vercel.com)
2. Import Git repository
3. Add `VITE_API_URL` environment variable
4. Deploy!

**Full instructions**: See [DEPLOY_PRODUCTION.md](DEPLOY_PRODUCTION.md)

---

## Features

### Admin Panel (`/admin`)
- 📦 Add/Edit/Delete products with image upload
- 📊 Dashboard analytics (products, orders, revenue)
- 📋 Order management with status updates
- 🎨 Luxury Fashion theme (Gold + Navy + Cream)

### Customer Features
- 🛍️ Browse products with filters
- ❤️ Wishlist
- 🛒 Shopping cart
- 💳 Razorpay payments
- 📦 Order tracking

## Tech Stack

- **Backend**: Node.js + Express + MySQL (Sequelize)
- **Frontend**: Svelte + Vite
- **Auth**: JWT + bcrypt
- **Payments**: Razorpay
- **Hosting**: Railway (backend) + Vercel (frontend)

## Local Development (Optional)

If you want to run locally:
1. Setup MySQL database
2. `cd server && npm install && npm run seed && npm run create-admin`
3. `npm run dev` (in server directory)
4. `npm run dev` (in root directory)

See [README.md](README.md) for detailed local setup.

## Environment Variables

### Backend (.env in server/)
```env
DB_HOST=${{MYSQL.MYSQLHOST}}
DB_PORT=${{MYSQL.MYSQLPORT}}
DB_NAME=${{MYSQL.MYSQLDATABASE}}
DB_USER=${{MYSQL.MYSQLUSER}}
DB_PASSWORD=${{MYSQL.MYSQLPASSWORD}}
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend.vercel.app
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app/api
```

## License

MIT

---

**Made with ❤️ - Luxury Fashion E-Commerce Platform**
