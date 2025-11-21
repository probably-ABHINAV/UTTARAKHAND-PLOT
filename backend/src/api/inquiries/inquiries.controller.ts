import { Request, Response, NextFunction } from 'express';
import { supabase, supabaseAdmin } from '../../config/supabaseClient';
import { CreateInquirySchema, UpdateInquirySchema } from './inquiries.validation';

// Get all inquiries (admin only)
export const getInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { data: inquiries, error } = await supabaseAdmin
      .from('inquiries')
      .select(`
        *,
        plots (title, location)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ inquiries });
  } catch (error) {
    next(error);
  }
};

// Get single inquiry (admin only)
export const getInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .select(`
        *,
        plots (title, location)
      `)
      .eq('id', id)
      .single();

    if (error || !inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.status(200).json({ inquiry });
  } catch (error) {
    next(error);
  }
};

// Create new inquiry (public)
export const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const inquiryData = req.body as CreateInquirySchema;

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert(inquiryData)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ 
      inquiry,
      message: 'Thank you for your inquiry! We will get back to you soon.' 
    });
  } catch (error) {
    next(error);
  }
};

// Update inquiry status (admin only)
export const updateInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;
    const { status } = req.body as UpdateInquirySchema['body'];

    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ inquiry });
  } catch (error) {
    next(error);
  }
};

// Delete inquiry (admin only)
export const deleteInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
