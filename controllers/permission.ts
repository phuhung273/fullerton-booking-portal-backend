import { NextFunction, Request, Response } from 'express';
import { sendData, sendError } from '../utils/response';
import Permission from '../models/permission';

function store(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    return Permission.create({
            name
        })
        .then((data) => {
            return sendData(res, data);
        })
        .catch((error) => {
            return sendError(res, error);
        });
};

/**
 * Add a role to a permission
 */
 async function addRole(req: Request, res: Response, next: NextFunction) {
    const { roleId, permissionId } = req.body;

    try {
        const data = await Permission.addRole(permissionId, roleId);
        return sendData(res, data);
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
    addRole,
};