import { Result } from "@badrap/result";
import {Plant} from "@prisma/client";
import {PlantError} from "./plant.errors";

export interface PlantCreateData {
    name: string;
    description: string;
    careInstructions: string;
    photoUrl: string;
    ownerId: number;
}

export interface PlantUpdateData {
    name?: string;
    description?: string;
    careInstructions?: string;
    photoUrl?: string;
    ownerId?: number;
}

export type PlantReadResult = Result<Plant, PlantError>;
export type PlantReadAllResult = Result<Plant[], PlantError>;
export type PlantCreateResult = Result<Plant, PlantError>;
export type PlantUpdateResult = Result<Plant, PlantError>;
export type PlantDeleteResult = Result<Plant, PlantError>;
