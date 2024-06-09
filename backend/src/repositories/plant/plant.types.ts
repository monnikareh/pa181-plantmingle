export type PlantCreate = {
    name: string,
    description?: string,
    careInstructions?: string,
    photoUrl: string,
    ownerId: number
}

export type PlantUpdate = {
    name?: string,
    description?: string,
    careInstructions?: string,
    photoUrl?: string,
}