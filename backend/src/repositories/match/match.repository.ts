import prisma from '../../client';
import { Result } from '@badrap/result';
import { MatchCreateData, MatchReadAllResult, MatchCreateResult } from './match.types';
import { MatchError } from './match.errors';
import { findUserById } from '../user/user.repository';
import { UserError } from '../user/user.errors';
import { findPlantById } from '../plant/plant.repository';
import { PlantError } from '../plant/plant.errors';

export const findManyMatches = async (): Promise<MatchReadAllResult> => {
    try {
        const matches = await prisma.match.findMany({
            include: {
                user1: true,
                user2: true,
                plant1: true,
                plant2: true,
            },
        });
        return Result.ok(matches);
    } catch (error) {
        return Result.err(MatchError.DatabaseReadError('Failed to read match records.'));
    }
};

export const postCreateMatch = async (matchData: MatchCreateData): Promise<MatchCreateResult> => {
    try {
        // Check if userId1 exists
        const user1Exists = await findUserById(matchData.userId1);
        if (user1Exists.isErr) {
            console.error(UserError.DatabaseReadError('Failed to read user records.'));
            return Result.err(MatchError.DatabaseCreateError('User 1 not found.'));
        }

        // Check if userId2 exists
        const user2Exists = await findUserById(matchData.userId2);
        if (user2Exists.isErr) {
            console.error(UserError.DatabaseReadError('Failed to read user records.'));
            return Result.err(MatchError.DatabaseCreateError('User 2 not found.'));
        }

        // Check if plantId1 exists
        const plant1Exists = await findPlantById(matchData.plantId1);
        if (plant1Exists.isErr) {
            console.error(PlantError.DatabaseReadError('Failed to read plant records.'));
            return Result.err(MatchError.DatabaseCreateError('Plant 1 not found.'));
        }

        // Check if plantId2 exists
        const plant2Exists = await findPlantById(matchData.plantId2);
        if (plant2Exists.isErr) {
            console.error(PlantError.DatabaseReadError('Failed to read plant records.'));
            return Result.err(MatchError.DatabaseCreateError('Plant 2 not found.'));
        }

        const createdMatch = await prisma.match.create({
            data: {
                ...matchData,
                matched_at: new Date(),
            },
            include: {
                user1: true,
                user2: true,
                plant1: true,
                plant2: true,
            },
        });
        return Result.ok(createdMatch);
    } catch (error) {
        console.log(error);
        return Result.err(MatchError.DatabaseCreateError('Failed to create match record.'));
    }
};
