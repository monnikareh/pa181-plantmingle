import { Request, Response } from 'express';
import { matchRepository } from '../repositories/match/match.repository';

export const createMatch = (req: Request, res: Response) => {
    const { userId1, userId2, plantId1, plantId2 } = req.body;
    const match = matchRepository.createMatch(userId1, userId2, plantId1, plantId2);
    res.status(201).json(match);
};
