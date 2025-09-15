import { Request, Response, NextFunction } from 'express';
import { PlotsService } from './plots.service';

export class PlotsController {
  static async createPlot(req: Request, res: Response, next: NextFunction) {
    try {
      const plot = await PlotsService.createPlot(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Plot created successfully',
        data: plot,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPublishedPlots(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PlotsService.getPublishedPlots(req.query as any);
      
      res.status(200).json({
        success: true,
        message: 'Plots retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPlots(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PlotsService.getAllPlots(req.query as any);
      
      res.status(200).json({
        success: true,
        message: 'Plots retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPlotBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const plot = await PlotsService.getPlotBySlug(req.params.slug);
      
      res.status(200).json({
        success: true,
        message: 'Plot retrieved successfully',
        data: plot,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePlot(req: Request, res: Response, next: NextFunction) {
    try {
      const plot = await PlotsService.updatePlot(req.params.slug, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Plot updated successfully',
        data: plot,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePlot(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PlotsService.deletePlot(req.params.slug);
      
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}