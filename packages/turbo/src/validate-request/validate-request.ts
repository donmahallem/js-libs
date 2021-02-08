/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { convertValidationError } from './convert-validation-error';

export type ValidationSchemas = object & {
    properties: {
        body?: object;
        params?: object;
        query?: object;
    },
};
export const validateRequest: (schemas: ValidationSchemas) => RequestHandler =
    (schemas: ValidationSchemas): RequestHandler => {
        const ajv: Ajv.Ajv = Ajv();
        return (req: Request, res: Response, next: NextFunction): void => {
            const validateFunction: ValidateFunction = ajv.compile(schemas);
            if (!validateFunction(req)) {
                const errors: ErrorObject[] = validateFunction.errors as ErrorObject[];
                next(convertValidationError(errors[0] as ErrorObject));
                return;
            }
            next();
        };
    };
