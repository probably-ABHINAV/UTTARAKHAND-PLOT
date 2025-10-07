import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import adminAuthRoutes from './routes/admin-auth';
import adminRoutes from './routes/admin';
import plotRoutes from './routes/plots';
import inquiryRoutes from './routes/inquiries';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || '8000', 10);

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  const databaseConfigured = !!process.env.DATABASE_URL;
  
  res.status(200).json({ 
    status: 'OK', 
    message: 'Uttarakhand Properties API is running',
    timestamp: new Date().toISOString(),
    services: {
      database: databaseConfigured ? 'configured' : 'not configured'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/plots', plotRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist.`
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📚 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});