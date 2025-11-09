import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
};

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, getJWTSecret(), (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user as { id: number; email: string; role: string };
    next();
  });
};

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, getJWTSecret(), (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const userData = user as { id: number; email: string; role: string };
    
    if (userData.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = userData;
    next();
  });
};

export const generateToken = (payload: { id: number; email: string; role: string }) => {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: '7d' });
};
