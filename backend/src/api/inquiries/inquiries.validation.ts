import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    message: z.string().min(1, 'Message is required'),
    plot_id: z.number().positive().optional(),
  }),
});

export const updateInquirySchema = z.object({
  body: z.object({
    status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid inquiry ID'),
  }),
});

export const getInquirySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid inquiry ID'),
  }),
});

export type CreateInquirySchema = z.infer<typeof createInquirySchema>['body'];
export type UpdateInquirySchema = z.infer<typeof updateInquirySchema>;
export type GetInquirySchema = z.infer<typeof getInquirySchema>;
