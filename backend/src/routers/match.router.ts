import express from 'express';
import { createMatch, getMatchById } from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.post('/', createMatch);
matchRouter.get('/:id', getMatchById);

export default matchRouter;
