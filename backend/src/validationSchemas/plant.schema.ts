import { z } from 'zod';

export const PlantCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    careInstructions: z.string(),
    photoUrl: z.string().url(),
    ownerId: z.number()
});

export const PlantUpdateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    careInstructions: z.string().optional(),
    photoUrl: z.string().url().optional()
});
