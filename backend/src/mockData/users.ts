import {User} from "../entities/User";

export const users: User[] = [
    {
        id: 1,
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'hashedpassword',
        location: 'Brno',
        bio: 'Gardening enthusiast.',
        profilePictureUrl: 'http://example.com/johndoe.jpg',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        username: 'janedoe',
        email: 'jane.doe@example.com',
        password: 'hashedpassword',
        location: 'Brno',
        bio: 'Love plants and sharing them!',
        profilePictureUrl: 'http://example.com/janedoe.jpg',
        created_at: new Date(),
        updated_at: new Date(),
    },
];