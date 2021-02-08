/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validate, Schema, ValidationError, ValidatorResult } from 'jsonschema';
import { RequestError } from '../request-error';

export const validateQueryParameter: (schema: Schema) => RequestHandler =
    (schema: Schema): RequestHandler => {
        return (req: Request, res: Response, next: NextFunction): void => {
            const result: ValidatorResult = validate(req.query, schema);
            if (result.valid) {
                next();
            } else {
                const error: ValidationError = result.errors[0];
                if (typeof error.schema === 'string') {
                    next(new RequestError(`Invalid query parameter '${error.schema}'`, 400));
                } else if (error.name === 'required') {
                    next(new RequestError(`Invalid query parameter '${error.argument}'`, 400));
                }
            }
        };
    };
