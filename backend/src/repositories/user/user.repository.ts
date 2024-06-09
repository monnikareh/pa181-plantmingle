import { UserCreate, UserUpdate } from './user.types';
import { User } from '../../entities/User'

class UserRepository {
    private users: User[];
    private lastId: number;

    constructor() {
        this.users = [];
        this.lastId = 0;
    }

    createUser(user: UserCreate): User {
        const newUser: User = {
            id: ++this.lastId,
            username: user.username,
            email: user.email,
            password: user.password,
            location: user.location,
            bio: user.bio || '',
            profilePictureUrl: user.profilePictureUrl,
            created_at: new Date(),
            updated_at: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }

    getUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): User[] {
        return this.users;
    }

    updateUser(id: number, userData: UserUpdate): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }

        const updatedUser: User = {
            ...this.users[userIndex],
            ...userData,
            updated_at: new Date()
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}

export const userRepository = new UserRepository();
