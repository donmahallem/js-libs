/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { convertValidationError } from './convert-validation-error';

type RequestSignature = Partial<Pick<Request, 'query' | 'params' | 'body'>>;
export type RequestSchema = JSONSchemaType<RequestSignature, true> & { additionalProperties: true };

type CheckKeys = 'query' | 'params' | 'body';
export type ValidationSchema<T extends CheckKeys, P extends boolean = false> = JSONSchemaType<Request[T], P>;
/**
 * Checks a request against the given schema
 * @param key property of the request to check the schema against
 * @param schema the jsonschema
 * @param ajvInstance optional ajv to be used
 */
export const validateRequest: <K extends CheckKeys>(key: K, schema: ValidationSchema<K>, ajvInstance?: Ajv) => RequestHandler =
    <K extends CheckKeys>(key: K, schema: ValidationSchema<K>, ajvInstance: Ajv = new Ajv()): RequestHandler => {
        const validateFunction: ValidateFunction = ajvInstance.compile(schema);
        return (req: Request, res: Response, next: NextFunction): void => {
            if (!validateFunction(req[key])) {
                const errors: DefinedError[] = validateFunction.errors as DefinedError[];
                next(convertValidationError(errors[0] as DefinedError));
                return;
            }
            next();
        };
    };
