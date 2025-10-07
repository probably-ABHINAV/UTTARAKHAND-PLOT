import { Router } from 'express';
import { db } from '../db';
import { plots } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allPlots = await db.select().from(plots).where(eq(plots.status, 'available'));
    res.json(allPlots);
  } catch (error) {
    console.error('Get plots error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [plot] = await db.select().from(plots).where(eq(plots.id, parseInt(id))).limit(1);
    
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }
    
    res.json(plot);
  } catch (error) {
    console.error('Get plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
