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

export default {
    store 
};