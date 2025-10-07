import { Router } from 'express';
import { db } from '../db';
import { inquiries, contactMessages } from '../db/schema';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const inquiryData = req.body;
    const [newInquiry] = await db.insert(inquiries).values({
      ...inquiryData,
      status: 'new',
    }).returning();
    
    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const messageData = req.body;
    const [newMessage] = await db.insert(contactMessages).values({
      ...messageData,
      status: 'new',
    }).returning();
    
    res.status(201).json({
      message: 'Contact message sent successfully',
      contactMessage: newMessage,
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
