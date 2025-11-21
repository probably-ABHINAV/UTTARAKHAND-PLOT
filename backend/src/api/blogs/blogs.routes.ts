import { Router } from 'express';
import { getBlogs, getBlog, getBlogBySlug, createBlog, updateBlog, deleteBlog } from './blogs.controller';
import { validate } from '../../middlewares/validation.middleware';
import { protect } from '../../middlewares/auth.middleware';
import { createBlogSchema, updateBlogSchema, getBlogSchema, getBlogBySlugSchema } from './blogs.validation';

const router = Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', validate(getBlogSchema), getBlog);
router.get('/slug/:slug', validate(getBlogBySlugSchema), getBlogBySlug);

// Protected routes (admin only)
router.post('/', protect, validate(createBlogSchema), createBlog);
router.put('/:id', protect, validate(updateBlogSchema), updateBlog);
router.delete('/:id', protect, validate(getBlogSchema), deleteBlog);

export default router;
