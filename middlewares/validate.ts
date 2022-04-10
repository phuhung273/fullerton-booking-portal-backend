import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { sendError } from '../utils/response';
import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Middleware: Validate request body
 * @param schema JOI validation schema
 */
export function validateBody (schema: ObjectSchema) {
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

export function validateJwt(req: Request, res: Response, next: NextFunction) {
    // Get bearer token
    let token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }
        
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if (error) {
            return sendError(res, error, error.message, 401);
        } else {
            req.body.jwt = decoded;
            next();
        }
    });
}