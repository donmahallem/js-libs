/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { ErrorObject, RequiredParams, TypeParams } from 'ajv';
import { RequestError } from '../request-error';

export const convertValidationError: (error: ErrorObject) => RequestError =
    (error: ErrorObject): RequestError => {
        console.log(error);
        const errorPath: string = error.dataPath === '' ? 'root' : error.dataPath;
        switch (error.keyword) {
            case 'required':
                const requiredParam: RequiredParams = error.params as RequiredParams;
                return new RequestError(`Missing property ${requiredParam.missingProperty} at '${errorPath}'`, 400);
            case 'pattern':
                return new RequestError(`Value doesn't match pattern at: '${errorPath}'`, 400);
            case 'type':
                const typeParam: TypeParams = error.params as TypeParams;
                return new RequestError(`Invalid type at '${errorPath}'. Expected ${typeParam.type}`, 400);
            default:
                return new RequestError(`Invalid '${errorPath}'`, 400);
        }
    };
