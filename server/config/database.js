import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Support both PostgreSQL (Render) and MySQL (Railway)
let sequelize;

if (process.env.DATABASE_URL) {
  // Render PostgreSQL - uses DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false
    }
  });
} else {
  // MySQL (Railway or local)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'shopi_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: false
      }
    }
  );
}

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    const dbType = process.env.DATABASE_URL ? 'PostgreSQL' : 'MySQL';
    console.log(`✅ ${dbType} Database connected successfully`);
    return true;
  } catch (error) {
    const dbType = process.env.DATABASE_URL ? 'PostgreSQL' : 'MySQL';
    console.error(`❌ Unable to connect to ${dbType} database:`, error.message);
    return false;
  }
};

// Sync all models with database
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Database synced ${force ? '(forced)' : ''}`);
  } catch (error) {
    console.error('❌ Database sync error:', error.message);
  }
};

export default sequelize;
