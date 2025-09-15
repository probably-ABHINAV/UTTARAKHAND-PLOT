import { supabaseAdmin, supabasePublic } from '../../config/supabase';
import { CreateInquiryInput, UpdateInquiryStatusInput, InquiryQueryInput } from './inquiries.validation';

export class InquiriesService {
  static async createInquiry(data: CreateInquiryInput) {
    // Verify plot exists if plotId is provided
    if (data.plotId) {
      const { data: plot, error } = await supabasePublic
        .from('plots')
        .select('id')
        .eq('id', data.plotId)
        .single();

      if (error || !plot) {
        throw new Error('Plot not found');
      }
    }

    const { data: inquiry, error } = await supabasePublic
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        plot_id: data.plotId || null
      })
      .select(`
        *,
        plots (
          id,
          title,
          slug
        )
      `)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return inquiry;
  }

  static async getAllInquiries(query: InquiryQueryInput) {
    const { page, limit, status, plotId } = query;
    const offset = (page - 1) * limit;

    let inquiryQuery = supabaseAdmin
      .from('inquiries')
      .select(`
        *,
        plots (
          id,
          title,
          slug
        )
      `);

    if (status) {
      inquiryQuery = inquiryQuery.eq('status', status);
    }

    if (plotId) {
      inquiryQuery = inquiryQuery.eq('plot_id', plotId);
    }

    const { data: inquiries, error } = await inquiryQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    // Get total count
    let countQuery = supabaseAdmin
      .from('inquiries')
      .select('*', { count: 'exact', head: true });

    if (status) {
      countQuery = countQuery.eq('status', status);
    }

    if (plotId) {
      countQuery = countQuery.eq('plot_id', plotId);
    }

    const { count: total } = await countQuery;

    return {
      inquiries: inquiries || [],
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit),
      },
    };
  }

  static async updateInquiryStatus(id: string, data: UpdateInquiryStatusInput) {
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .update({ status: data.status })
      .eq('id', id)
      .select(`
        *,
        plots (
          id,
          title,
          slug
        )
      `)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return inquiry;
  }

  static async deleteInquiry(id: string) {
    const { data: inquiry, error: fetchError } = await supabaseAdmin
      .from('inquiries')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error('Inquiry not found');
    }

    const { error: deleteError } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return { message: 'Inquiry deleted successfully' };
  }
}