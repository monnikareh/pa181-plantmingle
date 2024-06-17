import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { users } from './mockData/users';
import { plants } from './mockData/plants';
import { matches } from './mockData/matches';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
});

// Example endpoint to test database connection
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/plants', (req, res) => {
    res.json(plants);
});

app.get('/plants/:id', (req, res) => {
    const plantId = parseInt(req.params.id, 10);
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
        res.json(plant);
    } else {
        res.status(404).send('Plant not found');
    }
});

app.get('/matches', (req, res) => {
    res.json(matches);
});

app.get('/matches/:id', (req, res) => {
    const matchId = parseInt(req.params.id, 10);
    const match = matches.find(m => m.id === matchId);
    if (match) {
        res.json(match);
    } else {
        res.status(404).send('Match not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
