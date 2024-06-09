import { Match } from '../../entities/Match';

class MatchRepository {
    private matches: Match[];
    private lastId: number;

    constructor() {
        this.matches = [];
        this.lastId = 0;
    }

    createMatch(userId1: number, userId2: number, plantId1: number, plantId2: number): Match {
        const newMatch: Match = {
            id: ++this.lastId,
            userId1,
            userId2,
            plantId1,
            plantId2,
            matched_at: new Date()
        };
        this.matches.push(newMatch);
        return newMatch;
    }

    getMatchById(id: number): Match | undefined {
        return this.matches.find(match => match.id === id);
    }
}

export const matchRepository = new MatchRepository();
