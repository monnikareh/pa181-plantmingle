import { Request, Response } from 'express';
import { matchRepository } from '../repositories/match/match.repository';

export const createMatch = (req: Request, res: Response) => {
    const { userId1, userId2, plantId1, plantId2 } = req.body;
    const match = matchRepository.createMatch(userId1, userId2, plantId1, plantId2);
    res.status(201).json(match);
};

export const getMatchById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const match = matchRepository.getMatchById(id);
    if (!match) {
        return res.status(404).send('Match not found');
    }
    res.json(match);
};
