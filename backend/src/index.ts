import express from 'express';
import cors from 'cors';
import { users } from './mockData/users';
import { plants } from './mockData/plants';
import { matches } from './mockData/matches';


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
