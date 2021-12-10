/*
 * Package @donmahallem/turbo-validate-request
 * Source https://donmahallem.github.io/js-libs/
 */

import { RequestError } from '@donmahallem/turbo';
import Ajv, { DefinedError, ValidateFunction } from 'ajv';
import { expect } from 'chai';
import 'mocha';
import { convertValidationError } from './convert-validation-error';

describe('convert-validation-error.ts', (): void => {
    describe('convertValidationError', (): void => {
        let ajv: Ajv;
        beforeEach((): void => {
            ajv = new Ajv();
        });
        ['query parameter', 'path parameter'].forEach((): void => {
            it('should report expected array', (): void => {
                const validate: ValidateFunction = ajv.compile({
                    type: 'array',
                });
                // tslint:disable-next-line:no-unused-expression
                expect(validate({})).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                // tslint:disable-next-line:no-unused-expression
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Invalid type at 'root'. Expected array`);
            });
            it('should report missing top parameter', (): void => {
                const validate: ValidateFunction = ajv.compile({
                    properties: {
                        bottom: {
                            $id: 'bottom',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                        top: {
                            $id: 'top',
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: ['top'],
                    type: 'object',
                });
                // tslint:disable-next-line:no-unused-expression
                expect(validate({})).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                // tslint:disable-next-line:no-unused-expression
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Missing property top at 'root'`);
            });
            it('should report invalid param', (): void => {
                const validate: ValidateFunction = ajv.compile({
                    properties: {
                        bottom: {
                            pattern: '^[\\+\\-]?\\d+$',
                            type: 'string',
                        },
                    },
                    required: ['bottom'],
                    type: 'object',
                });
                // tslint:disable-next-line:no-unused-expression
                expect(
                    validate({
                        bottom: '-2992a',
                    })
                ).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                // tslint:disable-next-line:no-unused-expression
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Value doesn't match pattern at: '/bottom'`);
            });
            it('should report invalid param', (): void => {
                const validate: ValidateFunction = ajv.compile({
                    properties: {
                        bottom: {
                            type: 'array',
                        },
                    },
                    required: ['bottom'],
                    type: 'object',
                });
                // tslint:disable-next-line:no-unused-expression
                expect(
                    validate({
                        bottom: '-2992a',
                    })
                ).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                // tslint:disable-next-line:no-unused-expression
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Invalid type at '/bottom'. Expected array`);
            });
        });
    });
});
