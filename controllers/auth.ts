import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { sendData, sendError } from '../utils/response';
import User from '../models/user';


function register(req: Request, res: Response, next: NextFunction) {
    let { username, password } = req.body;

    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return sendError(res, hashError)
        }

        const user = new User({
            username,
            password: hash
        });

        return user.save()
            .then((data) => {
                return sendData(res, data);
            })
            .catch((error) => {
                return sendError(res, error);
            });
    });
};

export default {
    register 
};