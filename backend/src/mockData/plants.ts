import { Plant } from '../entities/Plant';

export const plants: Plant[] = [
    {
        id: 1,
        name: 'Aloe Vera',
        description: 'A succulent plant species of the genus Aloe.',
        careInstructions: 'Water deeply but infrequently, and place in bright, indirect light.',
        photoUrl: 'http://example.com/aloevera.jpg',
        ownerId: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        name: 'Snake Plant',
        description: 'A species of flowering plant in the family Asparagaceae.',
        careInstructions: 'Water every 2-8 weeks and place in indirect light.',
        photoUrl: 'http://example.com/snakeplant.jpg',
        ownerId: 2,
        created_at: new Date(),
        updated_at: new Date(),
    },
];
