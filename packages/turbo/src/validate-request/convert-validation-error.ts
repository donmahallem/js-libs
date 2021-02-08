/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { ValidationError } from 'jsonschema';
import { RequestError } from '../request-error';

export const convertValidationError: (error: ValidationError, type: string) => RequestError =
    (error: ValidationError, type: string): RequestError => {
        switch (error.name) {
            case 'required':
                return new RequestError(`Requires ${type} parameter '${error.argument}'`, 400);
            case 'pattern':
            case 'type':
                return new RequestError(`Invalid ${type} ${error.name}`, 400);
            default:
                return new RequestError(`Invalid ${type}`, 400);
        }
    };
