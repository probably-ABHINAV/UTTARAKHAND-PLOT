import { Router } from 'express';
import { getInquiries, getInquiry, createInquiry, updateInquiry, deleteInquiry } from './inquiries.controller';
import { validate } from '../../middlewares/validation.middleware';
import { protect } from '../../middlewares/auth.middleware';
import { createInquirySchema, updateInquirySchema, getInquirySchema } from './inquiries.validation';

const router = Router();

// Public routes
router.post('/', validate(createInquirySchema), createInquiry);

// Protected routes (admin only)
router.get('/', protect, getInquiries);
router.get('/:id', protect, validate(getInquirySchema), getInquiry);
router.put('/:id', protect, validate(updateInquirySchema), updateInquiry);
router.delete('/:id', protect, validate(getInquirySchema), deleteInquiry);

export default router;