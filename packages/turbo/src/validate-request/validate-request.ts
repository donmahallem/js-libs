/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { convertValidationError } from './convert-validation-error';

type RequestSignature = Partial<Pick<Request, 'query' | 'params' | 'body'>>;
export type RequestSchema = JSONSchemaType<RequestSignature, true>;
export const validateRequest: (schemas: RequestSchema) => RequestHandler =
    (schemas: RequestSchema): RequestHandler => {
        const ajv: Ajv = new Ajv();
        return (req: Request, res: Response, next: NextFunction): void => {
            const validateFunction: ValidateFunction = ajv.compile(schemas);
            if (!validateFunction(req)) {
                const errors: DefinedError[] = validateFunction.errors as DefinedError[];
                next(convertValidationError(errors[0] as DefinedError));
                return;
            }
            next();
        };
    };
