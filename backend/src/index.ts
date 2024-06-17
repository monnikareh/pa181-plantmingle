import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './client';
import UserRouter from "./routers/user.router";
import PlantRouter from "./routers/plant.router";
import MatchRouter from "./routers/match.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRouter);
app.use('/plants', PlantRouter);
app.use('/matches', MatchRouter);

app.get('/db-test', async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT NOW()`;
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
