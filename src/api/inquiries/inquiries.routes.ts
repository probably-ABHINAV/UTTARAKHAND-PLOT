import { Router } from 'express';
import { InquiriesController } from './inquiries.controller';
import { validateBody, validateQuery } from '../../middlewares/validation.middleware';
import { authenticateToken, requireAdmin } from '../../middlewares/auth.middleware';
import { 
  createInquirySchema, 
  updateInquiryStatusSchema, 
  inquiryQuerySchema 
} from './inquiries.validation';

const router = Router();

// Public routes
router.post('/', validateBody(createInquirySchema), InquiriesController.createInquiry);

// Admin routes
router.get('/', 
  authenticateToken, 
  requireAdmin, 
  validateQuery(inquiryQuerySchema), 
  InquiriesController.getAllInquiries
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateBody(updateInquiryStatusSchema), 
  InquiriesController.updateInquiryStatus
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  InquiriesController.deleteInquiry
);

export default router;