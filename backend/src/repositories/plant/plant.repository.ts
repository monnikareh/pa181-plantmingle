import { Plant } from '../../entities/Plant';
import { plants } from '../../mockData/plants';
import { PlantCreate, PlantUpdate } from "./plant.types";
import { Result } from '@badrap/result';
import {PlantError} from "./plant.errors";
import {users} from "../../mockData/users";

class PlantRepository {
    private plants: Plant[];

    constructor() {
        this.plants = plants;
    }

    getAllPlants(): Result<Plant[]> {
        try {
            return Result.ok(this.plants);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get all plants.'));
        }
    }

    getPlantById(id: number): Result<Plant | undefined> {
        try {
            const plant = this.plants.find(plant => plant.id === id);
            if (!plant) {
                return Result.err(PlantError.DatabaseReadError('Failed to get the plant.'));
            }
            return Result.ok(plant);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get the plant.'));
        }
    }

    createPlant(plant: PlantCreate): Result<Plant> {
        try {
            const newPlant = { ...plant, id: this.plants.length + 1, created_at: new Date(), updated_at: new Date() };
            this.plants.push(newPlant);
            return Result.ok(newPlant);
        } catch (error) {
            return Result.err(PlantError.DatabaseCreateError('Failed to create the plant.'));
        }
    }

    updatePlant(id: number, updatedPlant: PlantUpdate): Result<Plant | null> {
        try {
            const plantIndex = this.plants.findIndex(plant => plant.id === id);
            if (plantIndex === -1) {
                return Result.err(PlantError.DatabaseUpdateError('Plant not found.'));
            }
            const plant = this.plants[plantIndex];
            this.plants[plantIndex] = { ...plant, ...updatedPlant, updated_at: new Date() };
            return Result.ok(this.plants[plantIndex]);
        } catch (error) {
            return Result.err(PlantError.DatabaseUpdateError('Failed to update the plant.'));
        }
    }

    deletePlant(id: number): Result<boolean> {
        try {
            const plantIndex = this.plants.findIndex(plant => plant.id === id);
            if (plantIndex === -1) {
                return Result.err(PlantError.DatabaseDeleteError('Plant not found.'));
            }
            this.plants.splice(plantIndex, 1);
            return Result.ok(true);
        } catch (error) {
            return Result.err(PlantError.DatabaseDeleteError('Failed to delete the plant.'));
        }
    }

    readPlantsPaginated(page: number, pageSize: number): Result<Plant[]> {
        try {
            const offset = (page - 1) * pageSize;
            const paginatedPlants = this.plants.slice(offset, offset + pageSize);
            return Result.ok(paginatedPlants);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to get all plants.'));
        }
    }

    getPages(pageSize: number): Result<number> {
        try {
            const totalPages = Math.ceil(this.plants.length / pageSize);
            return Result.ok(totalPages);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('Failed to count'));
        }
    }

    getUserEmailById(userId: number): Result<string | undefined> {
        try {
            const userData = users.find(user => user.id === userId);
            if (!userData) {
                return Result.err(PlantError.DatabaseReadError('User for the plant not found.'));
            }
            return Result.ok(userData.email);
        } catch (error) {
            return Result.err(PlantError.DatabaseReadError('User for the plant not found.'));
        }
    }
}

export const plantRepository = new PlantRepository();
