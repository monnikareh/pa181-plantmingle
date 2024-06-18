import { Result } from "@badrap/result";
import {Match} from "@prisma/client";
import {MatchError} from "./match.errors";

export interface MatchCreateData {
    userId1: number;
    userId2: number;
    plantId1: number;
    plantId2: number;
}

export type MatchReadAllResult = Result<Match[], MatchError>;
export type MatchCreateResult = Result<Match, MatchError>;