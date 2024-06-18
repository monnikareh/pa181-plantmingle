import { Request, Response } from 'express';
import prisma from '../client';
import { MatchCreateSchema } from '../validationSchemas/match.schema';
import {parseRequest} from "../utils";
import {postCreateMatch} from "../repositories/match/match.repository";

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const matches = await prisma.match.findMany({
            include: {
                user1: true,
                user2: true,
                plant1: true,
                plant2: true,
            },
        });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches.' });
    }
};

export const createMatch = async (req: Request, res: Response) => {
    const newMatch = await parseRequest(MatchCreateSchema, req, res);
    if (!newMatch) return;

    const createdMatch = await postCreateMatch(newMatch.body);
    if (createdMatch.isErr) {
        return res.status(500).json(createdMatch.error);
    }
    res.status(201).json(createdMatch.value);
};

export const getMatchById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const match = await prisma.match.findUnique({
            where: { id },
            include: {
                user1: true,
                user2: true,
                plant1: true,
                plant2: true,
            },
        });
        if (!match) {
            return res.status(404).json({ error: 'Match not found.' });
        }
        res.json(match);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch match.' });
    }
};