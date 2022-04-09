import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { sendError } from '../utils/response';

/**
 * Middleware: Validate request body
 * @param schema JOI validation schema
 */
function validateBody (schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return sendError(res, error.details);
            } else {
                console.error(error);
                return sendError(res, error);
            }
        }
    };
};



export {
    validateBody,
}