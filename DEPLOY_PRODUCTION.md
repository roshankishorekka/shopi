# 🚀 DEPLOY TO PRODUCTION - No Local Setup Needed!

## Quick Deploy (15 minutes)

### Step 1: Deploy Backend to Railway (5 min) - Includes FREE MySQL!

1. **Go to Railway.app**
   - Visit: https://railway.app
   - Click "Start a New Project"
   - Login with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select your repository (or upload this folder)
   - Railway will auto-detect Node.js

3. **Add MySQL Database**
   - In your project, click "+ New"
   - Select "Database" → "Add MySQL"
   - Railway automatically creates a MySQL database!

4. **Configure Environment Variables**
   - Click on your backend service
   - Go to "Variables" tab
   - Click "Raw Editor" and paste:
   ```
   DB_HOST=${{MYSQL.MYSQLHOST}}
   DB_PORT=${{MYSQL.MYSQLPORT}}
   DB_NAME=${{MYSQL.MYSQLDATABASE}}
   DB_USER=${{MYSQL.MYSQLUSER}}
   DB_PASSWORD=${{MYSQL.MYSQLPASSWORD}}
   
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_xyz123
   PORT=5000
   NODE_ENV=production
   
   RAZORPAY_KEY_ID=rzp_test_your_key
   RAZORPAY_KEY_SECRET=your_secret
   
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

5. **Set Root Directory** (Important!)
   - In Settings → "Root Directory" → Enter: `server`
   - Save changes

6. **Deploy!**
   - Railway will auto-deploy
   - Wait for "Success" status
   - Copy the public URL (e.g., `https://shopi-production.up.railway.app`)

7. **Seed Database** (One-time setup)
   - After deployment, go to your service
   - Click "Deployments" → Select latest
   - Click "View Logs"
   - You'll need to run seed via Railway CLI OR:
   
   **Option A: Use Railway CLI** (Recommended)
   ```bash
   npm install -g @railway/cli
   railway login
   railway link
   railway run npm run seed
   railway run npm run create-admin
   ```
   
   **Option B: Add seed to package.json scripts temporarily**
   - Add to `server/package.json`:
   ```json
   "start": "node seed/seedProducts.js && node seed/createAdmin.js && node server.js"
   ```
   - Redeploy, then change it back to `"start": "node server.js"`

---

### Step 2: Deploy Frontend to Vercel (5 min)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Add New..." → "Project"
   - Login with GitHub

2. **Import Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Root Directory: **Leave as `.`** (project root)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     - Name: `VITE_API_URL`
     - Value: `https://your-railway-backend.up.railway.app/api`
   - (Use your Railway backend URL from Step 1)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like `https://shopi.vercel.app`

6. **Update Backend CORS**
   - Go back to Railway
   - Update `FRONTEND_URL` to your Vercel URL
   - Redeploy

---

### Step 3: Access Your Live Site! 🎉

- **Frontend**: `https://your-site.vercel.app`
- **Admin Panel**: `https://your-site.vercel.app/admin`
- **Backend API**: `https://your-backend.up.railway.app/api/health`

**Default Admin Credentials** (if you used defaults in seed):
- Email: `admin@shopi.com`
- Password: `Admin@123`

---

## Alternative: Deploy Backend to Render

If you prefer Render over Railway:

1. **Go to Render.com**
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. **Settings**:
   - Name: `shopi-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add MySQL Database**:
   - Go to "New +" → "PostgreSQL" (Render doesn't offer free MySQL)
   - OR use Railway for MySQL + Render for backend
6. Set environment variables same as Railway

---

## Alternative Frontend: Netlify

If you prefer Netlify over Vercel:

1. **Go to Netlify.com**
2. "Add new site" → "Import from Git"
3. Select repository
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy!

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] MySQL database connected
- [ ] Database seeded with products
- [ ] Admin user created
- [ ] Frontend deployed
- [ ] Frontend connected to backend API
- [ ] CORS configured correctly
- [ ] Admin panel accessible
- [ ] Can add/edit products via admin
- [ ] Orders working

---

## Troubleshooting

**"Cannot connect to database"**
→ Check environment variables match Railway's MySQL connection string format

**"CORS error"**
→ Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly (no trailing slash)

**"API calls failing"**
→ Check `VITE_API_URL` in Vercel includes `/api` at the end

**"Seed command not working"**
→ Use Railway CLI or temporarily modify start script

---

## Cost: $0/month! 🎉

- **Railway**: Free tier includes MySQL + backend hosting
- **Vercel**: Free tier for frontend
- **Total**: Completely FREE for starting out!

Upgrade when you need more resources or traffic.
