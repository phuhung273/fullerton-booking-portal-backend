import { Response } from 'express';

/**
 * Response error in structured format
 */
export function sendError(res: Response, data?: any, message: string = 'Error', statusCode: number = 200) {
    return res.status(statusCode).json({
        data,
        success: false,
        message,
    })
}

/**
 * Response data in structured format
 */
export function sendData(res: Response, data?: any, message: string = 'Success') {
    return res.json({
        data,
        success: true,
        message,
    })
}