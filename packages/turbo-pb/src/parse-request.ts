/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-pb
 */

import { RequestError } from '@donmahallem/turbo';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { Message, Type, Writer, Reader, Root, ReflectionObject } from 'protobufjs';

type MessageKey<T extends object> = ({
    encode: (msg: T) => Writer;
    decode: (msg: (Reader | Uint8Array), length?: number) => T;
} & typeof Message) | Type;
/**
 * Formats response to either json or protobuf
 * @param msg message to be formated
 * @param message Message to convert
 * @param res express Response object
 * @param next express Next function
 */
export const parseRequest = (msg: MessageKey<any>): RequestHandler => {
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
export const parseRequestRoot = (msg: Root): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.is('application/x-protobuf')) {
            const parts: string[] = (req.headers['content-type'] || '')?.split(';');
            if (parts.length !== 2) {
                next(new RequestError('Expected proto type', 400));
                return;
            } else {
                let refObj: Type;
                try {
                    refObj = msg.lookupType(parts[1]);
                } catch (err: any) {
                    next(new RequestError(`Unknown type '${parts[1]}'`));
                    return;
                }
                req.body = refObj.decode(req.body, req.headers['content-length'] ?
                    parseInt(req.headers['content-length']) : undefined);
                next();
            }
        } else {
            next();
        }
    };
};
