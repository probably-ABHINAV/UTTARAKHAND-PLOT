import { Router } from 'express';
import { db } from '../db';
import { blogPosts } from '../db/schema';
import { authenticateAdmin, AuthRequest } from '../middleware/auth';
import { eq, desc } from 'drizzle-orm';

const router = Router();

router.get('/', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const allBlogs = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    res.json(allBlogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const [blog] = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id))).limit(1);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const blogData = req.body;
    
    const [newBlog] = await db.insert(blogPosts).values({
      ...blogData,
      authorId: req.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const blogData = req.body;
    
    const [updatedBlog] = await db
      .update(blogPosts)
      .set({ 
        ...blogData, 
        updatedAt: new Date(),
        publishedAt: blogData.status === 'published' && !blogData.publishedAt ? new Date() : blogData.publishedAt
      })
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();
    
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticateAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
