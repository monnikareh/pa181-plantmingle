export enum MatchErrorCode {
    DatabaseCreateError = 'DATABASE_CREATE_ERROR',
    DatabaseReadError = 'DATABASE_READ_ERROR',
}

export class MatchError extends Error {
    code: MatchErrorCode;

    constructor(code: MatchErrorCode, message: string) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static DatabaseCreateError(message: string): MatchError {
        return new MatchError(MatchErrorCode.DatabaseCreateError, message);
    }

    static DatabaseReadError(message: string): MatchError {
        return new MatchError(MatchErrorCode.DatabaseReadError, message);
    }
}
