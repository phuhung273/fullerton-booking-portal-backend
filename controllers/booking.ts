import { Request, Response } from 'express';
import { sendData, sendError } from '../utils/response';

function store(req: Request, res: Response) {

    res.end();
};

export default {
    store,
};