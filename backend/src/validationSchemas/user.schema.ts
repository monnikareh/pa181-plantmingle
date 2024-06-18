import { object, string, Schema } from 'zod';
import {UserCreateData, UserUpdateData} from "../repositories/user/user.types";

export const UserCreateSchema: Schema<UserCreateData> = object({
    username: string().min(3).max(50),
    email: string().email(),
    password: string().min(6),
    location: string(),
    bio: string(),
    profilePictureUrl: string().url(),
});

export const UserUpdateSchema: Schema<Partial<UserUpdateData>> = object({
    username: string().min(3).max(50).optional(),
    email: string().email().optional(),
    password: string().min(6).optional(),
    location: string().optional(),
    bio: string().optional(),
    profilePictureUrl: string().url().optional(),
});
