/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-validate-request
 */

import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { convertValidationError } from './convert-validation-error';

type CheckKeys = 'query' | 'params' | 'body';
type MethodSignature = < T = object, _partial extends boolean = false >(key: CheckKeys,
    schema: JSONSchemaType<T, _partial>,
    ajvInstance?: Ajv) => RequestHandler;
/**
 * Checks a request against the given schema
 * @param key property of the request to check the schema against
 * @param schema the jsonschema
 * @param ajvInstance optional ajv to be used
 */
export const validateRequest: MethodSignature =
    <T, _partial extends boolean = false>(key: CheckKeys,
        schema: JSONSchemaType<T, _partial>,
        ajvInstance: Ajv = new Ajv()): RequestHandler => {
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
