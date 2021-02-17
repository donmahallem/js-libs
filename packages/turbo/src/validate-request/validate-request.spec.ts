/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { JSONSchemaType } from 'ajv';
import { expect } from 'chai';
import { RequestHandler } from 'express';
import 'mocha';
import { Done } from 'mocha';
import { RequestError } from '../request-error';
import { validateRequest } from './validate-request';

interface ITestObject {
    bottom?: string;
    top?: string;
}
const TEST_SCHEMA: JSONSchemaType<ITestObject> = {
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
// tslint:disable:no-unused-expression
describe('validate-request/validate-request.ts', (): void => {
    describe('validateRequest', (): void => {
        it('should pass if empty hash is provided', (done: Done): void => {
            const validationResult: RequestHandler = validateRequest('body', {
                properties: {

                },
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
                const validationResult: RequestHandler = validateRequest<ITestObject>('query', TEST_SCHEMA);
                validationResult({
                    query: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'query' correctly`, (done: Done): void => {
                const validationResult: RequestHandler = validateRequest<ITestObject>('query', TEST_SCHEMA);
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
                const validationResult: RequestHandler = validateRequest<ITestObject>('body', TEST_SCHEMA);
                validationResult({
                    body: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'body' correctly`, (done: Done): void => {
                const validationResult: RequestHandler = validateRequest<ITestObject>('body', TEST_SCHEMA);
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
                const validationResult: RequestHandler = validateRequest<ITestObject>('params', TEST_SCHEMA);
                validationResult({
                    params: { top: '123', bottom: '-123' },
                } as any, {} as any, (res?: any): void => {
                    expect(res).to.be.undefined;
                    done();
                });
            });
            it(`should reject property 'params' correctly`, (done: Done): void => {
                const validationResult: RequestHandler = validateRequest<ITestObject>('params', TEST_SCHEMA);
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
