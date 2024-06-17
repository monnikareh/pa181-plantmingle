import { PrismaClient, User } from '@prisma/client';
import prisma from '../../../client';
import { UserCreate, UserUpdate } from './user.types';
import { Result } from '@badrap/result';
import { UserError } from './user.errors';

class UserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(user: UserCreate): Promise<Result<User>> {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    location: user.location,
                    bio: user.bio || '',
                    profilePictureUrl: user.profilePictureUrl,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            return Result.ok(newUser);
        } catch (error) {
            return Result.err(UserError.DatabaseCreateError('Failed to create the user.'));
        }
    }

    async getUserById(id: number): Promise<Result<User | null>> {
        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                return Result.err(UserError.DatabaseReadError('User not found.'));
            }
            return Result.ok(user);
        } catch (error) {
            return Result.err(UserError.DatabaseReadError('Failed to get the user.'));
        }
    }

    async getAllUsers(): Promise<Result<User[]>> {
        try {
            const users = await this.prisma.user.findMany();
            return Result.ok(users);
        } catch (error) {
            return Result.err(UserError.DatabaseReadError('Failed to get all users.'));
        }
    }

    async updateUser(id: number, userData: UserUpdate): Promise<Result<User | null>> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    ...userData,
                    updated_at: new Date(),
                },
            });
            return Result.ok(updatedUser);
        } catch (error) {
            return Result.err(UserError.DatabaseUpdateError('Failed to update the user.'));
        }
    }

    async deleteUser(id: number): Promise<Result<boolean>> {
        try {
            await this.prisma.user.delete({ where: { id } });
            return Result.ok(true);
        } catch (error) {
            return Result.err(UserError.DatabaseDeleteError('Failed to delete the user.'));
        }
    }
}

export const userRepository = new UserRepository(prisma);
