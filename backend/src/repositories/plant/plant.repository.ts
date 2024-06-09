import { Plant } from '../../entities/Plant';
import { plants } from '../../mockData/plants';
import {PlantCreate, PlantUpdate} from "./plant.types";

class PlantRepository {
    private plants: Plant[];

    constructor() {
        this.plants = plants;
    }

    getAllPlants(): Plant[] {
        return this.plants;
    }

    getPlantById(id: number): Plant | undefined {
        return this.plants.find(plant => plant.id === id);
    }

    createPlant(plant: PlantCreate): Plant {
        const newPlant = { ...plant, id: this.plants.length + 1, created_at: new Date(), updated_at: new Date() };
        this.plants.push(newPlant);
        return newPlant;
    }

    updatePlant(id: number, updatedPlant: PlantUpdate): Plant | null {
        const plantIndex = this.plants.findIndex(plant => plant.id === id);
        if (plantIndex === -1) {
            return null;
        }
        const plant = this.plants[plantIndex];
        this.plants[plantIndex] = { ...plant, ...updatedPlant, updated_at: new Date() };
        return this.plants[plantIndex];
    }

    deletePlant(id: number): boolean {
        const plantIndex = this.plants.findIndex(plant => plant.id === id);
        if (plantIndex === -1) {
            return false;
        }
        this.plants.splice(plantIndex, 1);
        return true;
    }
}

export const plantRepository = new PlantRepository();
