export enum PlantErrorCode {
    DatabaseCreateError = 'DATABASE_CREATE_ERROR',
    DatabaseReadError = 'DATABASE_READ_ERROR',
    DatabaseUpdateError = 'DATABASE_UPDATE_ERROR',
    DatabaseDeleteError = 'DATABASE_DELETE_ERROR',
}

export class PlantError extends Error {
    code: PlantErrorCode;

    constructor(code: PlantErrorCode, message: string) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static DatabaseCreateError(message: string): PlantError {
        return new PlantError(PlantErrorCode.DatabaseCreateError, message);
    }

    static DatabaseReadError(message: string): PlantError {
        return new PlantError(PlantErrorCode.DatabaseReadError, message);
    }

    static DatabaseUpdateError(message: string): PlantError {
        return new PlantError(PlantErrorCode.DatabaseUpdateError, message);
    }

    static DatabaseDeleteError(message: string): PlantError {
        return new PlantError(PlantErrorCode.DatabaseDeleteError, message);
    }
}
