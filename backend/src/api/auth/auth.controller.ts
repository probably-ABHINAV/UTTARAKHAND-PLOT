import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../config/supabaseClient';
import { LoginSchema } from './auth.validation';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { email, password } = req.body as LoginSchema;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({
      message: 'Login successful',
      session: data.session,
    });
  } catch (error) {
    next(error);
  }
};
