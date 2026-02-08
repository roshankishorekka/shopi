import readline from 'readline';
import sequelize from '../config/database.js';
import User from '../models/User.js';
import { syncDatabase } from '../config/database.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
    try {
        console.log('\n🔐 Admin User Creation Tool\n');

        // Connect to database
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Sync database
        await syncDatabase(false);

        // Get admin details
        const name = await question('Admin Name (default: Admin): ') || 'Admin';
        const email = await question('Admin Email (default: admin@shopi.com): ') || 'admin@shopi.com';
        const password = await question('Admin Password (default: Admin@123): ') || 'Admin@123';
        const phone = await question('Phone Number (optional): ') || null;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email } });
        if (existingAdmin) {
            console.log('\n⚠️  An admin with this email already exists!');
            const confirm = await question('Do you want to update the password? (yes/no): ');

            if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
                existingAdmin.password = password;
                existingAdmin.role = 'admin';
                if (phone) existingAdmin.phone = phone;
                await existingAdmin.save();
                console.log('\n✅ Admin user updated successfully!');
            } else {
                console.log('\n❌ Creation cancelled');
            }
        } else {
            // Create new admin
            const admin = await User.create({
                name,
                email,
                password,
                phone,
                role: 'admin',
                isActive: true
            });

            console.log('\n✅ Admin user created successfully!');
            console.log('\n📋 Admin Details:');
            console.log(`   Name: ${admin.name}`);
            console.log(`   Email: ${admin.email}`);
            console.log(`   Role: ${admin.role}`);
            console.log(`   Password: [hidden - you set it above]`);
            console.log('\n🚀 You can now login to /admin with these credentials\n');
        }

        rl.close();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Failed to create admin:', error.message);
        rl.close();
        process.exit(1);
    }
};

createAdmin();
