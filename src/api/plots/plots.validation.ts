import { z } from 'zod';

export const createPlotSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description is too long'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255, 'Location is too long'),
  price: z
    .number()
    .positive('Price must be positive')
    .max(999999999999, 'Price is too large'),
  size_sqyd: z
    .number()
    .int('Size must be an integer')
    .positive('Size must be positive'),
  is_published: z.boolean().optional().default(false),
  images: z
    .array(z.object({
      url: z.string().url('Invalid image URL'),
    }))
    .optional()
    .default([]),
});

export const updatePlotSchema = createPlotSchema.partial();

export const plotQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  location: z.string().optional(),
  min_price: z.coerce.number().positive().optional(),
  max_price: z.coerce.number().positive().optional(),
  published: z.coerce.boolean().optional(),
});

export type CreatePlotInput = z.infer<typeof createPlotSchema>;
export type UpdatePlotInput = z.infer<typeof updatePlotSchema>;
export type PlotQueryInput = z.infer<typeof plotQuerySchema>;