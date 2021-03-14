/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import * as HttpStatus from 'http-status-codes';
import httpStatusCodes from 'http-status-codes';
import { IError } from './apiErrorHandler';

interface IJoiErrorDetail {
    message?: string;
    path?: string;
}

interface IJoiError extends IError {
    isJoi?: boolean;
    details?: Array<IJoiErrorDetail>;
}
/**
 * Joi error handler middleware
 *
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
export default (
    err: IJoiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (err.isJoi) {
        const error = {
            code: httpStatusCodes.BAD_REQUEST,
            message: HttpStatus.getStatusText(httpStatusCodes.BAD_REQUEST),
            details:
                err.details &&
                err.details.map(err => ({
                    message: err.message,
                    param: err.path,
                })),
        };
        return res.status(httpStatusCodes.BAD_REQUEST).json(error);
    }
    // If this isn't a Joi error, send it to the next error handler
    return next(err);
};