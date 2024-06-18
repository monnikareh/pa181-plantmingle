import { Result } from "@badrap/result";
import {User} from "@prisma/client";
import {UserError} from "./user.errors";

export interface UserCreateData {
    username: string;
    email: string;
    password: string;
    location: string;
    bio: string;
    profilePictureUrl: string;
}

export interface UserUpdateData {
    username?: string;
    email?: string;
    password?: string;
    location?: string;
    bio?: string;
    profilePictureUrl?: string;
}

export type UserReadResult = Result<User, UserError>;
export type UserReadAllResult = Result<User[], UserError>;
export type UserCreateResult = Result<User, UserError>;
export type UserUpdateResult = Result<User, UserError>;
export type UserDeleteResult = Result<User, UserError>;
