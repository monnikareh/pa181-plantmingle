import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './client';
import userRouter from "./routers/user.router";
import plantRouter from "./routers/plant.router";
import matchRouter from "./routers/match.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/plants', plantRouter);
app.use('/matches', matchRouter);

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
