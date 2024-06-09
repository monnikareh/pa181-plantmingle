export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    location: string;
    bio: string;
    profilePictureUrl: string;
    created_at: Date;
    updated_at: Date;
}
