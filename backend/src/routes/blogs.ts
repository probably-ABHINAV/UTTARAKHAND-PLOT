import { Router } from 'express';
import { db } from '../db';
import { blogPosts } from '../db/schema';
import { authenticateAdmin, AuthRequest } from '../middleware/auth';
import { eq, desc } from 'drizzle-orm';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allBlogs = await db.select().from(blogPosts).where(eq(blogPosts.status, 'published')).orderBy(desc(blogPosts.publishedAt));
    res.json(allBlogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [blog] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    await db.update(blogPosts)
      .set({ viewsCount: (blog.viewsCount || 0) + 1 })
      .where(eq(blogPosts.id, blog.id));
    
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
