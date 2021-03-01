/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-pb
 */

import { RequestError } from '@donmahallem/turbo';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { Message, Type, Writer, Reader, Root, ReflectionObject } from 'protobufjs';

export const parseRequest = <T extends object>(msg: typeof Message<T>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.is('application/x-protobuf')) {
            req.body = msg.decode(req.body, req.headers['content-length'] ?
                parseInt(req.headers['content-length']) : undefined);
            next();
        } else {
            next();
        }
    };
};
