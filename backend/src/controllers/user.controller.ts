import { Request, Response } from 'express';
import { userRepository } from '../repositories/user/user.repository';
import { UserCreateSchema, UserUpdateSchema } from '../validationSchemas/user.schema';
import { parseRequest } from '../utils';

export const getAllUsers = (req: Request, res: Response) => {
    const users = userRepository.getAllUsers();
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = userRepository.getUserById(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const newUser = await parseRequest(UserCreateSchema, req, res);
    if (!newUser) return;

    const createdUser = userRepository.createUser(newUser);
    res.status(201).json(createdUser);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedUser = await parseRequest(UserUpdateSchema, req, res);
    if (!updatedUser) return;

    const user = userRepository.updateUser(id, updatedUser);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const success = userRepository.deleteUser(id);
    if (!success) {
        return res.status(404).send('User not found');
    }
    res.status(204).send();
};
