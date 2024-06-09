import { Request, Response } from 'express';
import { plantRepository } from '../repositories/plant/plant.repository';
import {getAllPlantsSchema, PlantCreateSchema, PlantUpdateSchema} from '../validationSchemas/plant.schema';
import { parseRequest } from '../utils';
import {PlantError} from "../repositories/plant/plant.errors";

export const getAllPlants = async (req: Request, res: Response) => {
    const request = await parseRequest(getAllPlantsSchema, req, res);
    if (request === null) return;

    const page = request.query.page || 1;
    const pageSize = 10;

    const paginatedPlantsResult = plantRepository.readPlantsPaginated(page, pageSize);
    const totalPagesResult = plantRepository.getPages(pageSize);

    if (paginatedPlantsResult.isErr) {
        return res.status(500).json({ error: PlantError.DatabaseReadError('Failed to get all plants.').message });
    }

    if (totalPagesResult.isErr) {
        return res.status(500).json({ error: PlantError.DatabaseReadError('Failed to count plants.').message });
    }

    const plants = paginatedPlantsResult.value;
    const totalPages = totalPagesResult.value;

    return res.json({
        items: plants,
        pagination: {
            currentPage: page,
            totalPages: totalPages
        }
    });
};

export const getPlantById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const plant = plantRepository.getPlantById(id);
    if (!plant) {
        return res.status(404).send('Plant not found');
    }
    res.json(plant);
};

export const createPlant = async (req: Request, res: Response) => {
    const newPlant = await parseRequest(PlantCreateSchema, req, res);
    if (!newPlant) return;

    const createdPlant = plantRepository.createPlant(newPlant);
    res.status(201).json(createdPlant);
};

export const updatePlant = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedPlant = await parseRequest(PlantUpdateSchema, req, res);
    if (!updatedPlant) return;

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
