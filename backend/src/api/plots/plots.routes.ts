import { Router } from 'express';
import { getPlots, getPlot, createPlot, updatePlot, deletePlot } from './plots.controller';
import { validate } from '../../middlewares/validation.middleware';
import { protect } from '../../middlewares/auth.middleware';
import { createPlotSchema, updatePlotSchema, getPlotSchema } from './plots.validation';

const router = Router();

// Public routes
router.get('/', getPlots);
router.get('/:id', validate(getPlotSchema), getPlot);

// Protected routes (admin only)
router.post('/', protect, validate(createPlotSchema), createPlot);
router.put('/:id', protect, validate(updatePlotSchema), updatePlot);
router.delete('/:id', protect, validate(getPlotSchema), deletePlot);

export default router;
