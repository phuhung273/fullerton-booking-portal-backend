import { NextFunction, Request, Response } from 'express';
import { sendData, sendError } from '../utils/response';
import Role from '../models/role';
import User from '../models/user';

function store(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    return Role.create({
            name
        })
        .then((data) => {
            return sendData(res, data);
        })
        .catch((error) => {
            return sendError(res, error, error.message);
        });
};

/**
 * Assign a role to a user
 */
async function assignToUser(req: Request, res: Response, next: NextFunction) {
    const { roleId, userId } = req.body;

    try {
        const user = await User.assignRole(userId, roleId);
        return sendData(res, user);
    } catch (error) {
        if(error instanceof Error){
            return sendError(res, error, error.message);
        }
        else{
            return sendError(res, error);
        }
    }
};

export default {
    store,
    assignToUser
};