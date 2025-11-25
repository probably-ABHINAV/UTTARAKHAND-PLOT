import { z } from 'zod';

export const createPlotSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    price: z.number().positive('Price must be positive'),
    size_sqyd: z.number().positive('Size must be positive'),
    is_published: z.boolean().optional(),
    image_urls: z.array(z.string().url()).optional(),
  }),
});

export const updatePlotSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    slug: z.string().min(1, 'Slug is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    location: z.string().min(1, 'Location is required').optional(),
    price: z.number().positive('Price must be positive').optional(),
    size_sqyd: z.number().positive('Size must be positive').optional(),
    is_published: z.boolean().optional(),
    image_urls: z.array(z.string().url()).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid plot ID'),
  }),
});

export const getPlotSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid plot ID'),
  }),
});

export type CreatePlotSchema = z.infer<typeof createPlotSchema>['body'];
export type UpdatePlotSchema = z.infer<typeof updatePlotSchema>;
export type GetPlotSchema = z.infer<typeof getPlotSchema>;