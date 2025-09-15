import { supabaseAdmin, supabasePublic } from '../../config/supabase';
import { CreatePlotInput, UpdatePlotInput, PlotQueryInput } from './plots.validation';

export class PlotsService {
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static async createPlot(data: CreatePlotInput) {
    const slug = this.generateSlug(data.title);
    
    // Check if slug already exists
    const { data: existingPlot } = await supabaseAdmin
      .from('plots')
      .select('id')
      .eq('slug', slug)
      .single();

    let finalSlug = slug;
    if (existingPlot) {
      const timestamp = Date.now();
      finalSlug = `${slug}-${timestamp}`;
    }

    // Create the plot
    const { data: plot, error: plotError } = await supabaseAdmin
      .from('plots')
      .insert({
        title: data.title,
        slug: finalSlug,
        description: data.description,
        location: data.location,
        price: data.price,
        size_sqyd: data.size_sqyd,
        is_published: data.is_published || false
      })
      .select()
      .single();

    if (plotError) {
      throw new Error(plotError.message);
    }

    // Add images if provided
    if (data.images && data.images.length > 0) {
      const imageInserts = data.images.map(img => ({
        url: img.url,
        plot_id: plot.id
      }));

      const { error: imageError } = await supabaseAdmin
        .from('plot_images')
        .insert(imageInserts);

      if (imageError) {
        throw new Error(imageError.message);
      }
    }

    // Fetch the complete plot with images
    return await this.getPlotBySlug(finalSlug);
  }

  static async getPublishedPlots(query: PlotQueryInput) {
    const { page, limit, location, min_price, max_price } = query;
    const offset = (page - 1) * limit;

    let plotQuery = supabasePublic
      .from('plots')
      .select(`
        *,
        plot_images (
          id,
          url
        )
      `)
      .eq('is_published', true);

    if (location) {
      plotQuery = plotQuery.ilike('location', `%${location}%`);
    }

    if (min_price) {
      plotQuery = plotQuery.gte('price', min_price);
    }

    if (max_price) {
      plotQuery = plotQuery.lte('price', max_price);
    }

    const { data: plots, error, count } = await plotQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    // Get total count
    let countQuery = supabasePublic
      .from('plots')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);

    if (location) {
      countQuery = countQuery.ilike('location', `%${location}%`);
    }

    if (min_price) {
      countQuery = countQuery.gte('price', min_price);
    }

    if (max_price) {
      countQuery = countQuery.lte('price', max_price);
    }

    const { count: total } = await countQuery;

    return {
      plots: plots || [],
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit),
      },
    };
  }

  static async getAllPlots(query: PlotQueryInput) {
    const { page, limit, location, min_price, max_price, published } = query;
    const offset = (page - 1) * limit;

    let plotQuery = supabaseAdmin
      .from('plots')
      .select(`
        *,
        plot_images (
          id,
          url
        )
      `);

    if (published !== undefined) {
      plotQuery = plotQuery.eq('is_published', published);
    }

    if (location) {
      plotQuery = plotQuery.ilike('location', `%${location}%`);
    }

    if (min_price) {
      plotQuery = plotQuery.gte('price', min_price);
    }

    if (max_price) {
      plotQuery = plotQuery.lte('price', max_price);
    }

    const { data: plots, error } = await plotQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    // Get total count
    let countQuery = supabaseAdmin
      .from('plots')
      .select('*', { count: 'exact', head: true });

    if (published !== undefined) {
      countQuery = countQuery.eq('is_published', published);
    }

    if (location) {
      countQuery = countQuery.ilike('location', `%${location}%`);
    }

    if (min_price) {
      countQuery = countQuery.gte('price', min_price);
    }

    if (max_price) {
      countQuery = countQuery.lte('price', max_price);
    }

    const { count: total } = await countQuery;

    return {
      plots: plots || [],
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit),
      },
    };
  }

  static async getPlotBySlug(slug: string) {
    const { data: plot, error } = await supabasePublic
      .from('plots')
      .select(`
        *,
        plot_images (
          id,
          url
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      throw new Error('Plot not found');
    }

    return plot;
  }

  static async updatePlot(slug: string, data: UpdatePlotInput) {
    // First, get the existing plot
    const { data: existingPlot, error: fetchError } = await supabaseAdmin
      .from('plots')
      .select('*')
      .eq('slug', slug)
      .single();

    if (fetchError) {
      throw new Error('Plot not found');
    }

    // Generate new slug if title is being updated
    let newSlug = slug;
    if (data.title && data.title !== existingPlot.title) {
      newSlug = this.generateSlug(data.title);
      
      // Ensure unique slug
      const { data: slugExists } = await supabaseAdmin
        .from('plots')
        .select('id')
        .eq('slug', newSlug)
        .neq('id', existingPlot.id)
        .single();

      if (slugExists) {
        const timestamp = Date.now();
        newSlug = `${newSlug}-${timestamp}`;
      }
    }

    // Update the plot
    const updateData = {
      ...data,
      slug: newSlug,
    };

    const { data: updatedPlot, error: updateError } = await supabaseAdmin
      .from('plots')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    // Handle images update if provided
    if (data.images) {
      // Delete existing images
      await supabaseAdmin
        .from('plot_images')
        .delete()
        .eq('plot_id', existingPlot.id);

      // Add new images
      if (data.images.length > 0) {
        const imageInserts = data.images.map(img => ({
          url: img.url,
          plot_id: existingPlot.id
        }));

        const { error: imageError } = await supabaseAdmin
          .from('plot_images')
          .insert(imageInserts);

        if (imageError) {
          throw new Error(imageError.message);
        }
      }
    }

    // Return the updated plot with images
    return await this.getPlotBySlug(newSlug);
  }

  static async deletePlot(slug: string) {
    const { data: plot, error: fetchError } = await supabaseAdmin
      .from('plots')
      .select('id')
      .eq('slug', slug)
      .single();

    if (fetchError) {
      throw new Error('Plot not found');
    }

    const { error: deleteError } = await supabaseAdmin
      .from('plots')
      .delete()
      .eq('slug', slug);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return { message: 'Plot deleted successfully' };
  }
}