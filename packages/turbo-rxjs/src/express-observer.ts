/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-rxjs
 */

import { NextFunction, Response } from 'express';
import { Observer } from 'rxjs';

export const expressObserver = <T extends object>(res: Response, next: NextFunction): Observer<T> => {

    return {
        complete: () => {
            res.send();
        },
        error: (err: any): void => {
            next(err);
        },
        next: (val: T): void => {
            if (!res.headersSent) {
                res.status(200);
            }
            res.send(val);
        },
    };
};
