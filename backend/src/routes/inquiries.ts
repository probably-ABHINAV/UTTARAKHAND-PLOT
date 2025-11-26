import { Router } from 'express';
import { supabaseAdmin } from '../config/supabaseClient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ inquiries: data || [] });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json({ inquiry: data });
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const inquiryData = req.body;
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert([{
        ...inquiryData,
        status: 'new',
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiry: data,
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { id } = req.params;
    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Inquiry updated successfully',
      inquiry: data,
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const messageData = req.body;
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([{
        ...messageData,
        status: 'new',
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Contact message sent successfully',
      contactMessage: data,
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
