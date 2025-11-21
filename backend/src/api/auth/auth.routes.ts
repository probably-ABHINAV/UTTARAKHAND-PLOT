import { Router } from 'express';
import { login } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema } from './auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), login);

export default router;
