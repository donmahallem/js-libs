/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { NextFunction, Response } from 'express';
import { Message, Type, Writer } from 'protobufjs';
import { RequestError } from './request-error';

type MessageKey<T extends object> = ({
    encode: (msg: T) => Writer;
} & typeof Message) | Type;
export const formatResponse = <T extends object>(msg: T, message: MessageKey<T>, res: Response, next: NextFunction): void => {
    res.format({
        'application/json': (): void => {
            res.json(msg);
        },
        'application/x-protobuf': (): void => {
            const encodedMessage: Uint8Array = message.encode(msg).finish();
            res
                .type('application/x-protobuf')
                .send(encodedMessage);
        },
        default: (): void => {
            next(new RequestError('Not Acceptable', 406));
        },
    });
};
