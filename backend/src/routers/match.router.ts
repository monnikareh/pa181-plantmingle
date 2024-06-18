import express from 'express';
import {createMatch, getAllMatches, getMatchById} from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.get('/', getAllMatches);
matchRouter.post('/', createMatch);
matchRouter.get('/:id', getMatchById);

export default matchRouter;
