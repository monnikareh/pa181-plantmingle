import { Plant } from '../entities/Plant';
import { mockPlants } from '../mockData/plants';

class PlantRepository {
    private plants: Plant[];

    constructor() {
        this.plants = mockPlants;
    }

    getAllPlants(): Plant[] {
        return this.plants;
    }

    getPlantById(id: number): Plant | undefined {
        return this.plants.find(plant => plant.id === id);
    }

    createPlant(plant: Plant): Plant {
        const newPlant = { ...plant, id: this.plants.length + 1 };
        this.plants.push(newPlant);
        return newPlant;
    }

    updatePlant(id: number, updatedPlant: Partial<Plant>): Plant | null {
        const plantIndex = this.plants.findIndex(plant => plant.id === id);
        if (plantIndex === -1) {
            return null;
        }
        const plant = this.plants[plantIndex];
        this.plants[plantIndex] = { ...plant, ...updatedPlant };
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
