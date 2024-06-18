import { z } from 'zod';

export const MatchCreateSchema = z.object({
    userId1: z.number(),
    userId2: z.number(),
    plantId1: z.number(),
    plantId2: z.number()
});
