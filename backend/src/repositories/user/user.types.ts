export interface UserCreate {
    username: string;
    email: string;
    password: string;
    location: string;
    bio?: string;
    profilePictureUrl: string;
}

export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
    location?: string;
    bio?: string;
    profilePictureUrl?: string;
}
