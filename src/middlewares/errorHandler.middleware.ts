import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific Supabase errors
  if (err.message.includes('duplicate key value')) {
    statusCode = 409;
    message = 'Resource already exists';
  }

  if (err.message.includes('not found')) {
    statusCode = 404;
    message = 'Resource not found';
  }

  if (err.message.includes('foreign key constraint')) {
    statusCode = 400;
    message = 'Invalid reference';
  }

  console.error(`Error ${statusCode}: ${message}`, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};