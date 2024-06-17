export enum UserErrorCode {
    DatabaseCreateError = 'DATABASE_CREATE_ERROR',
    DatabaseReadError = 'DATABASE_READ_ERROR',
    DatabaseUpdateError = 'DATABASE_UPDATE_ERROR',
    DatabaseDeleteError = 'DATABASE_DELETE_ERROR',
}

export class UserError extends Error {
    code: UserErrorCode;

    constructor(code: UserErrorCode, message: string) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static DatabaseCreateError(message: string): UserError {
        return new UserError(UserErrorCode.DatabaseCreateError, message);
    }

    static DatabaseReadError(message: string): UserError {
        return new UserError(UserErrorCode.DatabaseReadError, message);
    }

    static DatabaseUpdateError(message: string): UserError {
        return new UserError(UserErrorCode.DatabaseUpdateError, message);
    }

    static DatabaseDeleteError(message: string): UserError {
        return new UserError(UserErrorCode.DatabaseDeleteError, message);
    }
}
