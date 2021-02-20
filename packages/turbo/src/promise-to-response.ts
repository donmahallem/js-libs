/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { AxiosError } from 'axios';
import { NextFunction, Response } from 'express';

type MethodType = <T>(prom: Promise<T>,
    res: Response,
    next?: NextFunction) => void;

export interface IErrorResponse {
    error: true;
    statusCode: number;
}
/**
 * Awaits an promise and returns it
 * @param prom promise to convert
 * @param res the express.Response to use
 * @param next (optional) response object
 */
export const promiseToResponse: MethodType = <T>(prom: Promise<T>,
    res: Response<T | IErrorResponse>,
    next?: NextFunction): void => {
    prom
        .then((value: T): void => {
            (res.headersSent ? res : res.status(200)).json(value);
        })
        .catch((err: any | AxiosError): void => {
            if (next) {
                next(err);
            } else if (err.isAxiosError === true) {
                const axiosError: AxiosError = err;
                const code: number = axiosError.response?.status || 500;
                res.status(code).json({
                    error: true,
                    statusCode: code,
                });
            } else {
                const code: number = err.statusCode || 500;
                res.status(code).json({
                    error: true,
                    statusCode: code,
                });
            }
        });
};
