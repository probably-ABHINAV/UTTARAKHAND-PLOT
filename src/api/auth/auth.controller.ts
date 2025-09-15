import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signUp(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Admin account created successfully',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }
}