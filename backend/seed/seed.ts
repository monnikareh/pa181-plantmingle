import { PrismaClient } from '@prisma/client';
import { users, plants, matches } from './data';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Seed Plants
    for (const plant of plants) {
        await prisma.plant.create({
            data: plant,
        });
    }

    // Seed Matches
    for (const match of matches) {
        await prisma.match.create({
            data: match,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
