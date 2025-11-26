import postgres from 'postgres';
import fs from 'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function hashPassword(password) {
  const crypto_module = await import('crypto');
  return crypto_module.createHash('sha256').update(password).digest('hex');
}

async function migrate() {
  try {
    console.log('Starting migration...');
    
    // Read and execute schema
    const schema = fs.readFileSync('./supabase_schema.sql', 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql.unsafe(statement.trim());
        } catch (err) {
          // Ignore "already exists" errors for CREATE TABLE IF NOT EXISTS
          if (!err.message.includes('already exists')) {
            console.error('Statement failed:', statement.substring(0, 100));
            console.error('Error:', err.message);
          }
        }
      }
    }
    
    console.log('✅ Schema created successfully');
    
    // Create admin user
    const adminPassword = await hashPassword('password123');
    
    try {
      await sql`
        INSERT INTO users (email, password, name, phone, role, is_active)
        VALUES (${'admin@propertyinuttrakhand.com'}, ${adminPassword}, ${'Admin User'}, ${'+919876543210'}, ${'admin'}, ${true})
        ON CONFLICT (email) DO NOTHING
      `;
      console.log('✅ Admin user created');
    } catch (err) {
      console.log('⚠️ Admin user may already exist:', err.message);
    }
    
    await sql.end();
    console.log('✅ Migration completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
