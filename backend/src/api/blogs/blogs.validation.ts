import { z } from 'zod';

// Create blog post schema
export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    slug: z.string().min(1, 'Slug is required').max(255).optional(),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    featured_image: z.string().url().optional(),
    category_id: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    meta_title: z.string().max(255).optional(),
    meta_description: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    is_featured: z.boolean().default(false),
  }),
});

// Update blog post schema
export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    slug: z.string().min(1).max(255).optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    featured_image: z.string().url().optional(),
    category_id: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    meta_title: z.string().max(255).optional(),
    meta_description: z.string().optional(),
    status: z.enum(['draft', 'published']).optional(),
    is_featured: z.boolean().optional(),
  }),
});

// Get blog post schema
export const getBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});

// Get blog by slug schema
export const getBlogBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>['body'];
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
export type GetBlogSchema = z.infer<typeof getBlogSchema>;
export type GetBlogBySlugSchema = z.infer<typeof getBlogBySlugSchema>;
