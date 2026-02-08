# 🔧 FIX RAILWAY DEPLOYMENT - Two Options

## ❌ Previous attempts with config files didn't work

Railway needs to know your backend code is in the `/server` directory, not the project root.

---

## ✅ OPTION 1: Manual Settings (EASIEST - 1 minute)

### In Railway:
1. Click your **"shopi"** service
2. Go to **"Settings"** tab
3. **Scroll ALL THE WAY DOWN** - keep scrolling past Deploy, Build, etc.
4. Find section labeled **"Service"** or **"Source"**
5. Look for field: **"Watch Paths"** or **"Root Directory"**
6. Set it to: `server`
7. Railway will auto-redeploy ✅

---

## ✅ OPTION 2: Delete & Recreate (CLEAN START - 3 minutes)

### Step A: Delete Current Service
1. In Railway, click "shopi" service
2. Settings tab → Scroll to bottom
3. Click **"Remove Service from All Environments"**
4. Confirm deletion (MySQL database stays safe!)

### Step B: Create New Service
1. Railway dashboard → Click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose your `shopi` repository  
4. **IMPORTANT**: Click "Configure" or "Advanced"
5. Set **"Root Directory" = `server`**
6. Click "Deploy"

### Step C: Link MySQL & Add Variables
1. Click new service → "Variables" tab
2. Click "+ Reference" → Select MySQL variables:
   ```
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   ```
3. Add other variables:
   ```
   JWT_SECRET=shopi_secret_key_xyz
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://shopi-tau.vercel.app
   RAZORPAY_KEY_ID=test_key
   RAZORPAY_KEY_SECRET=test_secret
   ```
4. Wait for deployment to complete

---

## After Successful Deployment:

Check logs for:
✅ "MySQL Database connected successfully"  
✅ "Server running on port 5000"

Then seed database:
```powershell
npm install -g @railway/cli
railway login
railway link
railway run npm run seed
railway run npm run create-admin
```

**I recommend OPTION 2 (delete & recreate) - it's  cleaner and guaranteed to work!**
