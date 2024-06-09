import { Router } from 'express';
import {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
} from '../controllers/plant.controller';

const router = Router();

router.get('/', getAllPlants);
router.get('/:id', getPlantById);
router.post('/', createPlant);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);

export default router;
