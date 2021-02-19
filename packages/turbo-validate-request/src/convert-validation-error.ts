/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-validate-request
 */

import { RequestError } from '@donmahallem/turbo';
import { DefinedError } from 'ajv';

export const convertValidationError: (error: DefinedError) => RequestError =
    (error: DefinedError): RequestError => {
        const errorPath: string = error.dataPath === '' ? 'root' : error.dataPath;
        switch (error.keyword) {
            case 'required':
                return new RequestError(`Missing property ${error.params.missingProperty} at '${errorPath}'`, 400);
            case 'pattern':
                return new RequestError(`Value doesn't match pattern at: '${errorPath}'`, 400);
            case 'type':
                return new RequestError(`Invalid type at '${errorPath}'. Expected ${error.params.type}`, 400);
            default:
                return new RequestError(`Invalid '${errorPath}'`, 400);
        }
    };
