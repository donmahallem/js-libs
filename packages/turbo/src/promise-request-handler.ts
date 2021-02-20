/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { NextFunction, RequestHandler, Response, Request } from 'express';
import { IErrorResponse } from './error-response';
import { promiseToResponse } from './promise-to-response';

type MethodInterface<T> = (req?: Request, res?: Response<T>) => Promise<T>;
/**
 * Awaits an promise and returns it
 * @param prom promise to convert
 * @param res the express.Response to use
 * @param next (optional) response object
 */
export const promiseRequestHandler: <T>(prom: MethodInterface<T>) => RequestHandler =
    <T>(prom: MethodInterface<T>): RequestHandler => {
        return (req: Request, res: Response<T | IErrorResponse>, next: NextFunction): void => {
            promiseToResponse(prom(req, res), res, next);
        }
    };
