import { Request, Response } from 'express';
import { PlantCreateSchema, PlantUpdateSchema } from '../validationSchemas/plant.schema';
import { parseRequest } from '../utils';
import {
    deleteDeletePlant,
    findManyPlants,
    findPlantById, postCreatePlant, putUpdatePlant,
} from "../repositories/plant/plant.repository";

export const getAllPlants = async (req: Request, res: Response) => {
    const plants = await findManyPlants();
    if (plants.isErr) {
        return res.status(500).json(plants.error);
    }
    res.json(plants.value);
};

export const getPlantById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const plant = await findPlantById(id);
    if (plant.isErr) {
        return res.status(404).json(plant.error);
    }
    res.json(plant.value);
};

export const createPlant = async (req: Request, res: Response) => {
    const newPlant = await parseRequest(PlantCreateSchema, req, res);
    if (!newPlant) return;

    const createdPlant = await postCreatePlant(newPlant.body);
    if (createdPlant.isErr) {
        return res.status(500).json(createdPlant.error);
    }
    res.status(201).json(createdPlant.value);
};

export const updatePlant = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedPlant = await parseRequest(PlantUpdateSchema, req, res);
    if (!updatedPlant) return;

    const plant = await putUpdatePlant(id, updatedPlant.body);
    if (plant.isErr) {
        return res.status(404).json(plant.error);
    }
    res.json(plant.value);
};

export const deletePlant = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await deleteDeletePlant(id);
    if (result.isErr) {
        return res.status(404).json(result.error);
    }
    res.status(204).send();
};
