import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from '../client';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/db-test', async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT NOW()`;
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/users', async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.get('/plants', async (req, res) => {
    try {
        const allPlants = await prisma.plant.findMany();
        res.json(allPlants);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving plants');
    }
});

app.get('/plants/:id', async (req, res) => {
    const plantId = parseInt(req.params.id, 10);
    try {
        const plant = await prisma.plant.findUnique({
            where: { id: plantId },
        });

        if (plant) {
            res.json(plant);
        } else {
            res.status(404).send('Plant not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving plant');
    }
});

app.get('/matches', async (req, res) => {
    try {
        const allMatches = await prisma.match.findMany();
        res.json(allMatches);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving matches');
    }
});

app.get('/matches/:id', async (req, res) => {
    const matchId = parseInt(req.params.id, 10);
    try {
        const match = await prisma.match.findUnique({
            where: { id: matchId },
        });

        if (match) {
            res.json(match);
        } else {
            res.status(404).send('Match not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving match');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
