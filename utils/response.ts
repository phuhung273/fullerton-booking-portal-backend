import { Response } from 'express';

/**
 * Response error in structured format
 */
function sendError(res: Response, data?: any, message?: string) {
    return res.json({
        data: data,
        success: false,
        message: message || 'Error'
    })
}

/**
 * Response data in structured format
 */
function sendData(res: Response, data?: any, message?: string) {
    return res.json({
        data: data,
        success: true,
        message: message || 'Success'
    })
}

export {
    sendError,
    sendData,
}