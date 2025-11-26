import { Router } from 'express';
import { supabaseAdmin } from '../config/supabaseClient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ blogs: data || [] });
  } catch (error) {
    console.error('Get blogs error:', error);
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
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ blog: data });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { title, slug, excerpt, content, featured_image, category_id, tags, meta_title, meta_description, status, is_featured } = req.body;

    const blogData: any = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt,
      content,
      featured_image,
      category_id,
      tags: tags || [],
      meta_title,
      meta_description,
      status: status || 'draft',
      is_featured: is_featured || false,
      views_count: 0,
    };

    if (status === 'published') {
      blogData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Blog created successfully',
      blog: data 
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { id } = req.params;
    const { title, slug, excerpt, content, featured_image, category_id, tags, meta_title, meta_description, status, is_featured } = req.body;

    const updateData: any = {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      tags,
      meta_title,
      meta_description,
      status,
      is_featured,
      updated_at: new Date().toISOString(),
    };

    if (status === 'published') {
      const { data: existing } = await supabaseAdmin
        .from('blog_posts')
        .select('published_at')
        .eq('id', id)
        .single();
      
      if (!existing?.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'Blog updated successfully',
      blog: data 
    });
  } catch (error) {
    console.error('Update blog error:', error);
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
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await supabaseAdmin
      .from('blog_posts')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', data.id);

    res.json({ blog: data });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
