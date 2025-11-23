import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';
import { products } from './products';

const MANUAL_BUNDLES = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_eh,
        mainWorker: eh_worker,
    },
};

let db = null;
let conn = null;

export const initDB = async () => {
    if (db) return { db, conn };

    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

    // Instantiate the asynchronus version of DuckDB-wasm
    const worker = new Worker(bundle.mainWorker);
    const logger = new duckdb.ConsoleLogger();
    db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    conn = await db.connect();

    await setupTables();
    return { db, conn };
};

const setupTables = async () => {
    // Create Users Table
    await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR PRIMARY KEY,
            name VARCHAR,
            email VARCHAR UNIQUE,
            password VARCHAR,
            avatar VARCHAR,
            role VARCHAR DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create Products Table
    await conn.query(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name VARCHAR,
            price DECIMAL(10, 2),
            image VARCHAR,
            hoverImage VARCHAR,
            category VARCHAR,
            description VARCHAR
        );
    `);

    // Create Analytics Table
    await conn.query(`
        CREATE TABLE IF NOT EXISTS analytics (
            id BIGINT PRIMARY KEY, -- Auto-increment not fully supported in same way, using sequence or manual
            event_type VARCHAR,
            user_id VARCHAR,
            metadata VARCHAR,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE SEQUENCE IF NOT EXISTS analytics_id_seq;
    `);

    // Seed Products if empty
    const result = await conn.query(`SELECT count(*) as count FROM products`);
    const count = result.toArray()[0].count;

    if (count == 0) {
        console.log("Seeding products...");
        const stmt = await conn.prepare(`INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?)`);
        for (const p of products) {
            await stmt.send(p.id, p.name, p.price, p.image, p.hoverImage, p.category, p.description);
        }
        await stmt.close();
    }
};

export const getDbConnection = async () => {
    if (!conn) {
        await initDB();
    }
    return conn;
};

// Helper for analytics
export const logEvent = async (eventType, userId = 'guest', metadata = '{}') => {
    const c = await getDbConnection();
    const id = Date.now(); // Simple ID generation
    await c.query(`INSERT INTO analytics VALUES (${id}, '${eventType}', '${userId}', '${metadata}', CURRENT_TIMESTAMP)`);
};
