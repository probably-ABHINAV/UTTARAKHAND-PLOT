require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    const client = await pool.connect();
    try {
        console.log("Dropping all tables in public schema...");
        await client.query(`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
      END $$;
    `);
        console.log("All tables dropped.");
    } catch (err) {
        console.error("Error wiping DB:", err);
    } finally {
        client.release();
        pool.end();
    }
}

main();
