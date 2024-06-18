import { Request, Response } from 'express';
import { UserCreateSchema, UserUpdateSchema } from '../validationSchemas/user.schema';
import { parseRequest } from '../utils';
import {
    deleteDeleteUser,
    findManyUsers,
    findUserById,
    postCreateUser,
    putUpdateUser
} from "../repositories/user/user.repository";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await findManyUsers();
    if (users.isErr) {
        return res.status(500).json(users.error);
    }
    res.json(users.value);
};

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await findUserById(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const newUser = await parseRequest(UserCreateSchema, req, res);
    if (!newUser) return;

    const createdUser = await postCreateUser(newUser.body);
    res.status(201).json(createdUser);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedUser = await parseRequest(UserUpdateSchema, req, res);
    if (!updatedUser) return;

    const user = await putUpdateUser(id, updatedUser.body);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const success = deleteDeleteUser(id);
    if (!success) {
        return res.status(404).send('User not found');
    }
    res.status(204).send();
};
