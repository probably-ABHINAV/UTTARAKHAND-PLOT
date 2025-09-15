import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from '../../middlewares/validation.middleware';
import { signUpSchema, loginSchema } from './auth.validation';

const router = Router();

// POST /api/auth/signup - Create admin account
router.post('/signup', validateBody(signUpSchema), AuthController.signUp);

// POST /api/auth/login - Admin login
router.post('/login', validateBody(loginSchema), AuthController.login);

export default router;