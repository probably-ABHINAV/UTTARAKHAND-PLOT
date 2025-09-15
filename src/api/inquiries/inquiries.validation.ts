import { z } from 'zod';

export const createInquirySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number is too long'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message is too long'),
  plotId: z
    .string()
    .uuid('Invalid plot ID')
    .optional(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
});

export const inquiryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']).optional(),
  plotId: z.string().uuid().optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
export type InquiryQueryInput = z.infer<typeof inquiryQuerySchema>;