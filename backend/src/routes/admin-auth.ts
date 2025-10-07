import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { admins } from '../db/schema';
import { generateToken } from '../middleware/auth';
import { eq } from 'drizzle-orm';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, secretCode } = req.body;

    if (secretCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: 'Invalid admin secret code' });
    }

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingAdmin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    
    if (existingAdmin.length > 0) {
      return res.status(400).json({ error: 'Admin already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newAdmin] = await db.insert(admins).values({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    }).returning();

    const token = generateToken({
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
    });

    res.status(201).json({
      message: 'Admin created successfully',
      token,
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    res.json({
      message: 'Admin signed in successfully',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
