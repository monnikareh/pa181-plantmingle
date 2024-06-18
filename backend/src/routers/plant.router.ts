import { Router } from 'express';
import {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
} from '../controllers/plant.controller';

const plantRouter = Router();

plantRouter.get('/', getAllPlants);
plantRouter.get('/:id', getPlantById);
plantRouter.post('/', createPlant);
plantRouter.put('/:id', updatePlant);
plantRouter.delete('/:id', deletePlant);

export default plantRouter;
