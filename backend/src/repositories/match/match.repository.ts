import { PrismaClient, Match } from '@prisma/client';
import prisma from '../../../client';
import { Result } from '@badrap/result';
import { MatchError } from './match.errors';

class MatchRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createMatch(userId1: number, userId2: number, plantId1: number, plantId2: number): Promise<Result<Match>> {
        try {
            const newMatch = await this.prisma.match.create({
                data: {
                    userId1,
                    userId2,
                    plantId1,
                    plantId2,
                    matched_at: new Date(),
                },
            });
            return Result.ok(newMatch);
        } catch (error) {
            return Result.err(MatchError.DatabaseCreateError('Failed to create the match.'));
        }
    }

    async getMatchById(id: number): Promise<Result<Match | null>> {
        try {
            const match = await this.prisma.match.findUnique({ where: { id } });
            if (!match) {
                return Result.err(MatchError.DatabaseReadError('Match not found.'));
            }
            return Result.ok(match);
        } catch (error) {
            return Result.err(MatchError.DatabaseReadError('Failed to get the match.'));
        }
    }
}

export const matchRepository = new MatchRepository(prisma);
