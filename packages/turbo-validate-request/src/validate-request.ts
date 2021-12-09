/*
 * Package @donmahallem/turbo-validate-request
 * Source https://donmahallem.github.io/js-libs/
 */

import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { convertValidationError } from './convert-validation-error';

type CheckKeys = 'query' | 'params' | 'body';
type MethodSignature = <T = object>(key: CheckKeys, schema: JSONSchemaType<T>, ajvInstance?: Ajv) => RequestHandler;
/**
 * Checks a request against the given schema
 *
 * @param {string} key property of the request to check the schema against
 * @param {JSONSchemaType} schema the jsonschema
 * @param {Ajv} ajvInstance optional ajv to be used
 * @returns {RequestHandler} express middleware
 */
export const validateRequest: MethodSignature = <T>(
    key: CheckKeys,
    schema: JSONSchemaType<T>,
    ajvInstance: Ajv = new Ajv()
): RequestHandler => {
    const validateFunction: ValidateFunction = ajvInstance.compile(schema);
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!validateFunction(req[key])) {
            const errors: DefinedError[] = validateFunction.errors as DefinedError[];
            next(convertValidationError(errors[0]));
            return;
        }
        next();
    };
};
