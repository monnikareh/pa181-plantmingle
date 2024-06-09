export interface Plant {
    id: number;
    name: string;
    description: string;
    careInstructions: string;
    photoUrl: string;
    ownerId: number;
    availability: string;
    created_at: Date;
    updated_at: Date;
}
