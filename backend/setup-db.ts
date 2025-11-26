import postgres from 'postgres';
import fs from 'fs';
import crypto from 'crypto';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const sql = postgres(databaseUrl);

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function setup() {
  try {
    console.log('🔧 Setting up database...');
    
    // Read schema
    const schema = fs.readFileSync('./supabase_schema.sql', 'utf-8');
    
    // Execute schema statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));
    
    let count = 0;
    for (const statement of statements) {
      try {
        await sql.unsafe(statement);
        count++;
      } catch (err: any) {
        // Ignore duplicate/exists errors
        if (!err.message.includes('already exists') && !err.message.includes('duplicate key')) {
          console.log(`⚠️ Skip: ${statement.substring(0, 60)}...`);
        }
      }
    }
    
    console.log(`✅ Schema ready (${count} statements)`);
    
    // Create admin user
    const adminEmail = 'admin@propertyinuttrakhand.com';
    const adminPassword = hashPassword('password123');
    
    try {
      await sql`
        INSERT INTO users (email, password, name, phone, role, is_active)
        VALUES (${adminEmail}, ${adminPassword}, ${'Admin User'}, ${'+919876543210'}, ${'admin'}, ${true})
        ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
      `;
      console.log(`✅ Admin user ready: ${adminEmail}`);
    } catch (err: any) {
      console.log(`⚠️ Admin setup: ${err.message.substring(0, 100)}`);
    }
    
    await sql.end();
    console.log('✅ Database setup complete!');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Setup failed:', err.message);
    process.exit(1);
  }
}

setup();
