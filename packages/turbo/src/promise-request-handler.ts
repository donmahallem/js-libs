/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { AxiosError } from 'axios';
import { NextFunction, RequestHandler, Response, Request } from 'express';

type MethodInterface<T> = (req?: Request, res?: Response) => Promise<T>;
/**
 * Awaits an promise and returns it
 * @param prom promise to convert
 * @param res the express.Response to use
 * @param next (optional) response object
 */
export const promiseRequestHandler: <T>(prom: MethodInterface<T>) => RequestHandler =
    <T>(prom: MethodInterface<T>): RequestHandler => {
        return (req: Request, res: Response<T | any>, next: NextFunction): void => {
            prom(req, res)
                .then((value: T): void => {
                    res.status(200).json(value);
                })
                .catch((err: any | AxiosError): void => {
                    if (next) {
                        next(err);
                    } else if (err.isAxiosError === true) {
                        const axiosError: AxiosError = err;
                        const code: number = axiosError.response?.status || 500;
                        res.status(code)
                            .json({
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
        }
    };
