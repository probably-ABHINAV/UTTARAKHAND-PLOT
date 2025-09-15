import { Request, Response, NextFunction } from 'express';
import { InquiriesService } from './inquiries.service';

export class InquiriesController {
  static async createInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const inquiry = await InquiriesService.createInquiry(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InquiriesService.getAllInquiries(req.query as any);
      
      res.status(200).json({
        success: true,
        message: 'Inquiries retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInquiryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const inquiry = await InquiriesService.updateInquiryStatus(id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Inquiry status updated successfully',
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await InquiriesService.deleteInquiry(id);
      
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}