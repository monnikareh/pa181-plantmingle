import { z } from 'zod';

export const PlantCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    careInstructions: z.string().optional(),
    photoUrl: z.string().url(),
    ownerId: z.number()
});

export const PlantUpdateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    careInstructions: z.string().optional(),
    photoUrl: z.string().url()
});
