/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IErrorResponse } from './error-response';
import { promiseToResponse } from './promise-to-response';

type MethodInterface<T> = (req?: Request, res?: Response<T>) => Promise<T>;

export const promiseRequestHandler: <T>(prom: MethodInterface<T>) => RequestHandler =
    <T>(prom: MethodInterface<T>): RequestHandler => {
        return (req: Request, res: Response<T | IErrorResponse>, next: NextFunction): void => {
            promiseToResponse(prom(req, res), res, next);
        };
    };
