# DATABASE SETUP GUIDE

## Option 1: Using MySQL Workbench (GUI - Easiest)
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create a new schema" button (database icon)
4. Name it: `shopi_db`
5. Click Apply
6. Done! The backend will create tables automatically

## Option 2: Using MySQL Command Line Client
1. Open "MySQL 8.0 Command Line Client" from Start Menu
2. Enter your root password
3. Run these commands:
   ```sql
   CREATE DATABASE shopi_db;
   SHOW DATABASES;
   ```
4. Type `exit` to quit

## Option 3: Add MySQL to PATH (For command line access)
1. Find your MySQL installation folder (usually: C:\Program Files\MySQL\MySQL Server 8.0\bin)
2. Add it to Windows PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" under System Variables
   - Add: C:\Program Files\MySQL\MySQL Server 8.0\bin
   - Click OK and restart PowerShell
3. Then you can run: `mysql -u root -p`

## After Creating Database:
Update your MySQL password in server/.env file:
```
DB_PASSWORD=your_actual_mysql_password
```

Then continue with:
```bash
cd server
npm install
npm run seed
npm run create-admin
```
