import { Request, Response, NextFunction } from 'express';
import { supabase, supabaseAdmin } from '../../config/supabaseClient';
import { CreateBlogSchema, UpdateBlogSchema } from './blogs.validation';

// Get all blog posts (public - published only, admin - all posts)
export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    // Check if user is admin (has authorization header)
    const isAdmin = req.headers.authorization;

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    // If not admin, only show published posts
    if (!isAdmin) {
      query = query.eq('status', 'published');
    }

    const { data: blogs, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

// Get single blog post by ID
export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { data: blog, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views count
    await supabaseAdmin
      ?.from('blog_posts')
      .update({ views_count: (blog.views_count || 0) + 1 })
      .eq('id', id);

    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

// Get blog post by slug
export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { slug } = req.params;

    const { data: blog, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views count
    await supabaseAdmin
      ?.from('blog_posts')
      .update({ views_count: (blog.views_count || 0) + 1 })
      .eq('slug', slug);

    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

// Create new blog post (admin only)
export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const blogData = req.body as CreateBlogSchema;

    // Generate slug from title if not provided
    if (!blogData.slug) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Set published_at if status is published
    const insertData: any = {
      ...blogData,
      author_id: (req as any).user?.id || 1, // Use authenticated user ID
      published_at: blogData.status === 'published' ? new Date().toISOString() : null,
    };

    const { data: blog, error } = await supabaseAdmin
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ blog });
  } catch (error) {
    next(error);
  }
};

// Update blog post (admin only)
export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;
    const updateData = req.body as UpdateBlogSchema['body'];

    // If status is being changed to published and published_at is null, set it
    const updates: any = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    if (updateData.status === 'published') {
      // Check if blog already has published_at
      const { data: existingBlog } = await supabaseAdmin
        .from('blog_posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (existingBlog && !existingBlog.published_at) {
        updates.published_at = new Date().toISOString();
      }
    }

    const { data: blog, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

// Delete blog post (admin only)
export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
