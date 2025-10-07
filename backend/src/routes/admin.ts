import { Router } from 'express';
import { db } from '../db';
import { plots, inquiries, contactMessages, users } from '../db/schema';
import { authenticateAdmin, AuthRequest } from '../middleware/auth';
import { eq, desc } from 'drizzle-orm';

const router = Router();

router.get('/plots', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const allPlots = await db.select().from(plots).orderBy(desc(plots.createdAt));
    res.json(allPlots);
  } catch (error) {
    console.error('Get plots error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/plots', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const plotData = req.body;
    const [newPlot] = await db.insert(plots).values(plotData).returning();
    res.status(201).json(newPlot);
  } catch (error) {
    console.error('Create plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/plots/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const plotData = req.body;
    const [updatedPlot] = await db
      .update(plots)
      .set({ ...plotData, updatedAt: new Date() })
      .where(eq(plots.id, parseInt(id)))
      .returning();
    
    if (!updatedPlot) {
      return res.status(404).json({ error: 'Plot not found' });
    }
    
    res.json(updatedPlot);
  } catch (error) {
    console.error('Update plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/plots/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await db.delete(plots).where(eq(plots.id, parseInt(id)));
    res.json({ message: 'Plot deleted successfully' });
  } catch (error) {
    console.error('Delete plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/inquiries', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    res.json(allInquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/inquiries/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const inquiryData = req.body;
    const [updatedInquiry] = await db
      .update(inquiries)
      .set({ ...inquiryData, updatedAt: new Date() })
      .where(eq(inquiries.id, parseInt(id)))
      .returning();
    
    if (!updatedInquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    res.json(updatedInquiry);
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/contact-messages', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/users', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      phone: users.phone,
      role: users.role,
      createdAt: users.createdAt,
    }).from(users).orderBy(desc(users.createdAt));
    res.json(allUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const [plotsCount] = await db.select().from(plots);
    const [inquiriesCount] = await db.select().from(inquiries);
    const [usersCount] = await db.select().from(users);
    const [messagesCount] = await db.select().from(contactMessages);

    res.json({
      plots: plotsCount ? Object.keys(plotsCount).length : 0,
      inquiries: inquiriesCount ? Object.keys(inquiriesCount).length : 0,
      users: usersCount ? Object.keys(usersCount).length : 0,
      messages: messagesCount ? Object.keys(messagesCount).length : 0,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
