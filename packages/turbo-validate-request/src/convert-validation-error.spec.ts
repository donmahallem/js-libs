/*
 * Package @donmahallem/turbo-validate-request
 * Source https://donmahallem.github.io/js-libs/
 */

import { RequestError } from '@donmahallem/turbo';
import Ajv, { DefinedError, ValidateFunction } from 'ajv';
import { expect } from 'chai';
import 'mocha';
import { convertValidationError } from './convert-validation-error.js';

describe('convert-validation-error.ts', function (): void {
    describe('convertValidationError', function (): void {
        let ajv: Ajv;

        beforeEach(function (): void {
            ajv = new Ajv();
        });
        // eslint-disable-next-line mocha/no-setup-in-describe
        ['query parameter', 'path parameter'].forEach(function (): void {
            it('should report expected array', function (): void {
                const validate: ValidateFunction = ajv.compile({
                    type: 'array',
                });
                expect(validate({})).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Invalid type at 'root'. Expected array`);
            });
            it('should report missing top parameter', function (): void {
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
                expect(validate({})).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Missing property top at 'root'`);
            });
            it('should report invalid param', function (): void {
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
                expect(
                    validate({
                        bottom: '-2992a',
                    })
                ).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Value doesn't match pattern at: '/bottom'`);
            });
            it('should report invalid param 2', function (): void {
                const validate: ValidateFunction = ajv.compile({
                    properties: {
                        bottom: {
                            type: 'array',
                        },
                    },
                    required: ['bottom'],
                    type: 'object',
                });
                expect(
                    validate({
                        bottom: '-2992a',
                    })
                ).to.be.false;
                const errors: DefinedError[] = validate.errors as DefinedError[];
                expect(errors).to.not.be.undefined;
                const testError: RequestError = convertValidationError(errors[0]);
                expect(testError).to.be.instanceOf(RequestError, 'should be a RequestError');
                expect(testError.message).to.equal(`Invalid type at '/bottom'. Expected array`);
            });
        });
    });
});
