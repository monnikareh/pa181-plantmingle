import type { Request, Response } from 'express';
import { ZodSchema, ZodTypeDef } from "zod";
import { fromZodError } from "zod-validation-error";

export const parseRequest = async <
    Output,
    Def extends ZodTypeDef = ZodTypeDef,
    Input = Output,
>(
    schema: ZodSchema<Output, Def, Input>,
    req: Request,
    res: Response,
): Promise<{ body: Output } | null> => {
    const parsedRequest = await schema.safeParseAsync(req.body);

    if (!parsedRequest.success) {
        const error = fromZodError(parsedRequest.error);
        const errorResponse: Error = {
            name: 'ValidationError',
            message: error.message
        };
        res.status(400).send(errorResponse);
        return null;
    }

    return { body: parsedRequest.data };
};
