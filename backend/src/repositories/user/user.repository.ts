import prisma from '../../client';
import { Result } from '@badrap/result';
import {
    UserCreateData,
    UserUpdateData,
    UserReadResult,
    UserReadAllResult,
    UserCreateResult,
    UserUpdateResult,
    UserDeleteResult
} from './user.types';

import { UserError } from './user.errors';

export const findUserById = async (id: number): Promise<UserReadResult> => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: id },
            include: {
                plants: true,
                matchesAsUser1: true,
                matchesAsUser2: true
            }
        });
        if (!user) {
            return Result.err(UserError.DatabaseReadError('User not found.'));
        }
        return Result.ok(user);
    } catch (error) {
        return Result.err(UserError.DatabaseReadError('Failed to read user record.'));
    }
};

export const findManyUsers = async (): Promise<UserReadAllResult> => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                username: 'asc',
            },
            include: {
                plants: true,
                matchesAsUser1: true,
                matchesAsUser2: true
            }
        });
        return Result.ok(users);
    } catch (error) {
        return Result.err(UserError.DatabaseReadError('Failed to read user records.'));
    }
};

export const postCreateUser = async (userData: UserCreateData): Promise<UserCreateResult> => {
    try {
        const createdUser = await prisma.user.create({ data: { ...userData, created_at: new Date(), updated_at: new Date() } });
        return Result.ok(createdUser);
    } catch (error) {
        console.error("Error creating user response:");
        return Result.err(UserError.DatabaseCreateError('Failed to create user record.'));
    }
};

export const putUpdateUser = async (id: number, userData: UserUpdateData): Promise<UserUpdateResult> => {
    try {
        const updatedUser = await prisma.user.update({ data: userData, where: { id: id }});
        return Result.ok(updatedUser);
    } catch (error) {
        return Result.err(UserError.DatabaseUpdateError('Failed to update user record.'));
    }
};

export const deleteDeleteUser = async (id: number): Promise<UserDeleteResult> => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id }
        });
        return Result.ok(deletedUser);
    } catch (error) {
        return Result.err(UserError.DatabaseDeleteError('Failed to delete user record.'));
    }
};