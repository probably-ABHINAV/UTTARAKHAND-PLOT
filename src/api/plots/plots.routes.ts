import { Router } from 'express';
import { PlotsController } from './plots.controller';
import { validateBody, validateQuery } from '../../middlewares/validation.middleware';
import { authenticateToken, requireAdmin } from '../../middlewares/auth.middleware';
import { createPlotSchema, updatePlotSchema, plotQuerySchema } from './plots.validation';

const router = Router();

// Public routes
router.get('/', validateQuery(plotQuerySchema), PlotsController.getPublishedPlots);
router.get('/:slug', PlotsController.getPlotBySlug);

// Admin routes
router.get('/admin/all', 
  authenticateToken, 
  requireAdmin, 
  validateQuery(plotQuerySchema), 
  PlotsController.getAllPlots
);

router.post('/', 
  authenticateToken, 
  requireAdmin, 
  validateBody(createPlotSchema), 
  PlotsController.createPlot
);

router.put('/:slug', 
  authenticateToken, 
  requireAdmin, 
  validateBody(updatePlotSchema), 
  PlotsController.updatePlot
);

router.delete('/:slug', 
  authenticateToken, 
  requireAdmin, 
  PlotsController.deletePlot
);

export default router;