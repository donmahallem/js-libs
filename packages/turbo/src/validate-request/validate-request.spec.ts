/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { expect } from 'chai';
import { RequestHandler } from 'express';
import 'mocha';
import { Done } from 'mocha';
import { RequestError } from '../request-error';
import { validateRequest, ValidationSchema } from './validate-request';

// tslint:disable:no-unused-expression
describe('validate-request/validate-request.ts', (): void => {
    describe('validateRequest', (): void => {
        it('should pass if empty hash is provided', (done: Done): void => {
            const validationResult: RequestHandler = validateRequest('body', {
                nullable: true,
                required: [],
                type: 'object',
            });
            validationResult({ body: {} } as any, {} as any, (res?: any): void => {
                expect(res).to.be.undefined;
                done();
            });
        });
        describe(`should check 'query'`, (): void => {
            it(`should pass correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'query'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('query', configObj);
                validationResult({
                    query: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'query' correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'query'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('query', configObj);
                validationResult({
                    query: { top: 'asdf', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.not.be.undefined;
                    expect(res).to.be.instanceOf(RequestError);
                    done();
                });
            });
        });
        describe(`should check 'body'`, (): void => {
            it(`should pass correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'body'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('body', configObj);
                validationResult({
                    body: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'body' correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'body'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('body', configObj);
                validationResult({
                    body: { top: 'asdf', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.not.be.undefined;
                    expect(res).to.be.instanceOf(RequestError);
                    done();
                });
            });
        });
        describe(`should check 'params'`, (): void => {
            it(`should pass correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'params'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('params', configObj);
                validationResult({
                    params: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'params' correctly`, (done: Done): void => {
                const configObj: ValidationSchema<'params'> = {
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            nullable: true,
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const validationResult: RequestHandler = validateRequest('params', configObj);
                validationResult({
                    params: { top: 'asdf', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.not.be.undefined;
                    expect(res).to.be.instanceOf(RequestError);
                    done();
                });
            });
        });
    });
});
