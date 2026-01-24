import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }, // Common for Supabase
});

export const db = drizzle(pool);
