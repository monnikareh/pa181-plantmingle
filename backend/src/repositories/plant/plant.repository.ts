import { PrismaClient, Plant } from '@prisma/client';
import prisma from '../../../client';
import { PlantCreate, PlantUpdate } from './plant.types';
import { Result } from '@badrap/result';
import { PlantError } from './plant.errors';

class PlantRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getAllPlants(): Promise<Result<Plant[]>> {
        try {
            const plants = await this.prisma.plant.findMany();
            return Result.ok(plants);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get all plants.'));
        }
    }

    async getPlantById(id: number): Promise<Result<Plant | null>> {
        try {
            const plant = await this.prisma.plant.findUnique({ where: { id } });
            if (!plant) {
                return Result.err(PlantError.DatabaseReadError('Failed to get the plant.'));
            }
            return Result.ok(plant);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get the plant.'));
        }
    }

    async createPlant(plant: PlantCreate): Promise<Result<Plant>> {
        try {
            const newPlant = await this.prisma.plant.create({
                data: {
                    ...plant,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            return Result.ok(newPlant);
        } catch (error) {
            return Result.err(PlantError.DatabaseCreateError('Failed to create the plant.'));
        }
    }

    async updatePlant(id: number, updatedPlant: PlantUpdate): Promise<Result<Plant | null>> {
        try {
            const plant = await this.prisma.plant.update({
                where: { id },
                data: {
                    ...updatedPlant,
                    updated_at: new Date(),
                },
            });
            return Result.ok(plant);
        } catch (error) {
            return Result.err(PlantError.DatabaseUpdateError('Failed to update the plant.'));
        }
    }

    async deletePlant(id: number): Promise<Result<boolean>> {
        try {
            await this.prisma.plant.delete({ where: { id } });
            return Result.ok(true);
        } catch (error) {
            return Result.err(PlantError.DatabaseDeleteError('Failed to delete the plant.'));
        }
    }

    async readPlantsPaginated(page: number, pageSize: number): Promise<Result<Plant[]>> {
        try {
            const plants = await this.prisma.plant.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            return Result.ok(plants);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get paginated plants.'));
        }
    }

    async getPages(pageSize: number): Promise<Result<number>> {
        try {
            const count = await this.prisma.plant.count();
            const totalPages = Math.ceil(count / pageSize);
            return Result.ok(totalPages);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to count pages.'));
        }
    }

    async getUserEmailById(userId: number): Promise<Result<string | null>> {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return Result.err(PlantError.DatabaseReadError('User for the plant not found.'));
            }
            return Result.ok(user.email);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('User for the plant not found.'));
        }
    }
}

export const plantRepository = new PlantRepository(prisma);
