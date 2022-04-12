import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response';
import config from '../config/config';
import User from '../models/user';

/**
 * Middleware: Validate request body
 *
 * @param schema JOI validation schema
 */
export function validateBody(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, error.details);
      }
      console.error(error);
      return sendError(res, error);
    }
  };
}

/**
 * Middleware: Validate header bearer token
 *
 */
export function validateJwt(req: Request, res: Response, next: NextFunction) {
  // Get bearer token
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.server.token.secret, (error, decoded) => {
    if (error) {
      return sendError(res, error, error.message, 401);
    }
    // Attach decoded token for later use
    req.body.jwt = decoded;
    next();
  });
}

/**
 * Middleware: Validate user role
 *
 * @param roles Roles allowed
 */
export function validateRole(roles: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => validateJwt(req, res, async () => {
    const { id } = req.body.jwt;

    // Jwt middleware broken
    if (!id) {
      return sendError(res, null, 'Broken token', 500);
    }

    const user = await User.findById(id).populate('role');
    if (!user) {
      return sendError(res, null, 'User not found', 401);
    } if (!user?.role || !roles.includes(user.role.name)) {
      return sendError(res, null, "You're not allowed to execute this operation");
    }

    // Attach user object for later use
    req.body.user = user;
    next();
  });
}
