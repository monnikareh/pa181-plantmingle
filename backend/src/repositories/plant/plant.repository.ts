import prisma from '../../client';
import { Result } from '@badrap/result';
import {
    PlantCreateData,
    PlantUpdateData,
    PlantReadResult,
    PlantReadAllResult,
    PlantCreateResult,
    PlantUpdateResult,
    PlantDeleteResult
} from './plant.types';

import { PlantError } from './plant.errors';
import {findUserById} from "../user/user.repository";
import {UserError} from "../user/user.errors";

export const findPlantById = async (id: number): Promise<PlantReadResult> => {
    try {
        const plant = await prisma.plant.findFirst({
            where: { id: id },
            include: {
                owner: true,
                matchesAsPlant1: true,
                matchesAsPlant2: true,
            },
        });
        if (!plant) {
            return Result.err(PlantError.DatabaseReadError('Plant not found.'));
        }
        return Result.ok(plant);
    } catch (error) {
        return Result.err(PlantError.DatabaseReadError('Failed to read plant record.'));
    }
};

export const findManyPlants = async (): Promise<PlantReadAllResult> => {
    try {
        const plants = await prisma.plant.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                owner: true,
                matchesAsPlant1: true,
                matchesAsPlant2: true,
            },
        });
        return Result.ok(plants);
    } catch (error) {
        return Result.err(PlantError.DatabaseReadError('Failed to read plant records.'));
    }
};

export const postCreatePlant = async (plantData: PlantCreateData): Promise<PlantCreateResult> => {
    const ownerExists = await findUserById(plantData.ownerId);

    if (ownerExists.isErr) {
        console.error(UserError.DatabaseReadError('Failed to read user records.'));
        return Result.err(PlantError.DatabaseCreateError('Owner user not found.'));
    }

    try {
        const createdPlant = await prisma.plant.create({
            data: {
                ...plantData,
                created_at: new Date(),
                updated_at: new Date()
            }
        });
        return Result.ok(createdPlant);
    } catch (error) {
        console.log(error);
        return Result.err(PlantError.DatabaseCreateError('Failed to create plant record.'));
    }
};

export const putUpdatePlant = async (id: number, plantData: PlantUpdateData): Promise<PlantUpdateResult> => {
    try {
        const updatedPlant = await prisma.plant.update({ data: plantData, where: { id: id }});
        return Result.ok(updatedPlant);
    } catch (error) {
        return Result.err(PlantError.DatabaseUpdateError('Failed to update plant record.'));
    }
};

export const deleteDeletePlant = async (id: number): Promise<PlantDeleteResult> => {
    try {
        const deletedPlant = await prisma.plant.delete({
            where: { id }
        });
        return Result.ok(deletedPlant);
    } catch (error) {
        return Result.err(PlantError.DatabaseDeleteError('Failed to delete plant record.'));
    }
};
