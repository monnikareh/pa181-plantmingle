import { Request, Response } from 'express';
import { plantRepository } from '../repositories/plant/plant.repository';

export const getAllPlants = (req: Request, res: Response) => {
    const plants = plantRepository.getAllPlants();
    res.json(plants);
};

export const getPlantById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const plant = plantRepository.getPlantById(id);
    if (!plant) {
        return res.status(404).send('Plant not found');
    }
    res.json(plant);
};

export const createPlant = (req: Request, res: Response) => {
    const newPlant = req.body;
    const createdPlant = plantRepository.createPlant(newPlant);
    res.status(201).json(createdPlant);
};

export const updatePlant = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedPlant = req.body;
    const plant = plantRepository.updatePlant(id, updatedPlant);
    if (!plant) {
        return res.status(404).send('Plant not found');
    }
    res.json(plant);
};

export const deletePlant = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const success = plantRepository.deletePlant(id);
    if (!success) {
        return res.status(404).send('Plant not found');
    }
    res.status(204).send();
};
