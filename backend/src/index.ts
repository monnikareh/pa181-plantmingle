import express from 'express';
import cors from 'cors';
import plantRouter from './routers/plant.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/plants', plantRouter);

app.get('/', (req, res) => {
    res.send('Hello from the mocked backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
