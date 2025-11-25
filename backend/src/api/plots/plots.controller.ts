import { Request, Response, NextFunction } from 'express';
import { supabase, supabaseAdmin } from '../../config/supabaseClient';
import { CreatePlotSchema, UpdatePlotSchema } from './plots.validation';

// Get all plots (public - published only, admin - all plots)
export const getPlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { data: plots, error } = await supabase
      .from('plots')
      .select(`
        *,
        plot_images (url)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ plots });
  } catch (error) {
    next(error);
  }
};

// Get single plot by ID
export const getPlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { data: plot, error } = await supabase
      .from('plots')
      .select(`
        *,
        plot_images (url)
      `)
      .eq('id', id)
      .single();

    if (error || !plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    res.status(200).json({ plot });
  } catch (error) {
    next(error);
  }
};

// Create new plot (admin only)
export const createPlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase || !supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const plotData = req.body as CreatePlotSchema;
    const { image_urls, ...plotFields } = plotData;

    // Insert plot
    const { data: plot, error: plotError } = await supabaseAdmin
      .from('plots')
      .insert(plotFields)
      .select()
      .single();

    if (plotError) {
      return res.status(500).json({ error: plotError.message });
    }

    // Insert images if provided
    if (image_urls && image_urls.length > 0) {
      const imageData = image_urls.map(url => ({
        plot_id: plot.id,
        url: url,
      }));

      const { error: imageError } = await supabaseAdmin
        .from('plot_images')
        .insert(imageData);

      if (imageError) {
        console.error('Error inserting images:', imageError);
      }
    }

    // Fetch the complete plot with images
    const { data: completePlot, error: fetchError } = await supabase
      .from('plots')
      .select(`
        *,
        plot_images (url)
      `)
      .eq('id', plot.id)
      .single();

    if (fetchError) {
      return res.status(500).json({ error: fetchError.message });
    }

    res.status(201).json({ plot: completePlot });
  } catch (error) {
    next(error);
  }
};

// Update plot (admin only)
export const updatePlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabase || !supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;
    const updateData = req.body as UpdatePlotSchema['body'];
    const { image_urls, ...plotFields } = updateData;

    // Update plot
    const { data: plot, error: plotError } = await supabaseAdmin
      .from('plots')
      .update({ ...plotFields, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (plotError) {
      return res.status(500).json({ error: plotError.message });
    }

    // Update images if provided
    if (image_urls !== undefined) {
      // Delete existing images
      await supabaseAdmin
        .from('plot_images')
        .delete()
        .eq('plot_id', id);

      // Insert new images
      if (image_urls.length > 0) {
        const imageData = image_urls.map(url => ({
          plot_id: parseInt(id),
          url: url,
        }));

        const { error: imageError } = await supabaseAdmin
          .from('plot_images')
          .insert(imageData);

        if (imageError) {
          console.error('Error updating images:', imageError);
        }
      }
    }

    // Fetch the complete updated plot
    const { data: completePlot, error: fetchError } = await supabase
      .from('plots')
      .select(`
        *,
        plot_images (url)
      `)
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(500).json({ error: fetchError.message });
    }

    res.status(200).json({ plot: completePlot });
  } catch (error) {
    next(error);
  }
};

// Delete plot (admin only)
export const deletePlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!supabaseAdmin) {
      return res.status(503).json({ error: 'Service unavailable: Database not configured' });
    }

    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('plots')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Plot deleted successfully' });
  } catch (error) {
    next(error);
  }
};