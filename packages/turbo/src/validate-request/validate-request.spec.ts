/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { expect } from 'chai';
import { RequestHandler } from 'express';
import 'mocha';
import { Done } from 'mocha';
import { RequestError } from '../request-error';
import { validateRequest, ValidationSchema } from './validate-request';

type CheckKeys = 'query' | 'params' | 'body';
const checkKeys: CheckKeys[] = ['query', 'params', 'body'];
// tslint:disable:no-unused-expression
describe('validate-request/validate-request.ts', (): void => {
    describe('validateRequest', (): void => {
        it('should pass if empty hash is provided', (done: Done): void => {
            const validationResult: RequestHandler = validateRequest('body', {
                nullable: true,
                type: 'object',
                required: [],
            });
            validationResult({ body: {} } as any, {} as any, (res?: any): void => {
                expect(res).to.be.undefined;
                done();
            });
        });
        checkKeys.forEach((key: CheckKeys): void => {
            it(`should check property '${key}' correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'body'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                            nullable: true,
                        },
                        top: {
                            $id: 'top',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                            nullable: true,
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest(key, configObj);
                validationResult({
                    [key]: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property '${key}' correctly`, (done: Done): void => {
                const configObj: ValidationSchema<typeof key> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                            nullable: true,
                        },
                        top: {
                            $id: 'top',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                            nullable: true,
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest(key, configObj);
                validationResult({
                    [key]: { top: 'asdf', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.not.be.undefined;
                    expect(res).to.be.instanceOf(RequestError);
                    done();
                });
            });
        });
    });
});
