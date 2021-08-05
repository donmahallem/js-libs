/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { AxiosError } from 'axios';
import { NextFunction, Response } from 'express';
import { IErrorResponse } from './error-response';

type MethodType = <T>(prom: Promise<T>, res: Response, next?: NextFunction) => void;

/**
 * Awaits an promise and returns it
 *
 * @param prom promise to convert
 * @param res the express.Response to use
 * @param next (optional) response object
 */
export const promiseToResponse: MethodType = <T>(prom: Promise<T>, res: Response<T | IErrorResponse>, next?: NextFunction): void => {
    prom.then((value: T): void => {
        (res.headersSent ? res : res.status(200)).json(value);
    }).catch((err: any | AxiosError): void => {
        if (next) {
            next(err);
            return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        } else if (err && err.isAxiosError === true) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const axiosError: AxiosError = err;
            const code: number = axiosError.response?.status || 500;
            res.status(code).json({
                error: true,
                statusCode: code,
            });
            return;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            const code: number = err?.statusCode || 500;
            res.status(code).json({
                error: true,
                statusCode: code,
            });
            return;
        }
    });
};
