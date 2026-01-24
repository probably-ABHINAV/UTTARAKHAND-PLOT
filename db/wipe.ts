import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { db } from "./index";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Dropping all tables...");

    // This query drops all tables in the public schema
    await db.execute(sql`
    DO $$ DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
    END $$;
  `);

    console.log("All tables dropped.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
