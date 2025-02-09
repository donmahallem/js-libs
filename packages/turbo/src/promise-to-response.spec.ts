/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { promiseToResponse } from './promise-to-response.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('promise-to-response.ts', function (): void {
    describe('promiseToResponse(prom,res)', function (): void {
        let jsonSpy: sinon.SinonSpy;
        let nextSpy: sinon.SinonSpy;
        let statusStub: sinon.SinonStub;
        let resObj: any;
        const testResponse: any = {
            success: true,
            test: 'response',
        };

        before(function (): void {
            jsonSpy = sinon.spy();
            nextSpy = sinon.spy();
            statusStub = sinon.stub();
            resObj = {
                json: jsonSpy,
                status: statusStub,
            };
            statusStub.returns(resObj);
        });

        afterEach(function (): void {
            jsonSpy.resetHistory();
            nextSpy.resetHistory();
            statusStub.resetHistory();
        });

        describe('promise resolves', function (): void {
            // eslint-disable-next-line mocha/no-setup-in-describe
            [true, false].forEach((nextProvided: boolean): void => {
                describe(`next parameter ${nextProvided ? '' : 'not'} provided`, function (): void {
                    it('should forward the resolved value to the response', function (done: Mocha.Done): void {
                        if (nextProvided) {
                            promiseToResponse(Promise.resolve(testResponse), resObj, nextSpy);
                        } else {
                            promiseToResponse(Promise.resolve(testResponse), resObj);
                        }
                        setTimeout(function (): void {
                            expect(nextSpy.callCount).to.equal(0);
                            expect(statusStub.callCount).to.equal(1);
                            expect(jsonSpy.callCount).to.equal(1);
                            expect(statusStub.getCall(0).args).to.deep.equal([200]);
                            expect(jsonSpy.getCall(0).args).to.deep.equal([testResponse]);
                            done();
                        }, 100);
                    });

                    it('should forward the resolved value to the response and not send status', function (done: Mocha.Done): void {
                        const testResponseObject: any = Object.assign(
                            {
                                headersSent: true,
                            },
                            resObj
                        );
                        if (nextProvided) {
                            promiseToResponse(Promise.resolve(testResponse), testResponseObject, nextSpy);
                        } else {
                            promiseToResponse(Promise.resolve(testResponse), testResponseObject);
                        }
                        setTimeout(function (): void {
                            expect(nextSpy.callCount).to.equal(0);
                            expect(statusStub.callCount).to.equal(0);
                            expect(jsonSpy.callCount).to.equal(1);
                            expect(jsonSpy.getCall(0).args).to.deep.equal([testResponse]);
                            done();
                        }, 100);
                    });
                });
            });
        });

        describe('promise rejects', function (): void {
            const testErrors: any[] = [
                {
                    error: {
                        message: 'another message',
                        statusCode: 400,
                    },
                    response: {
                        statusCode: 400,
                    },
                },
                {
                    error: new Error('test erorr'),
                    response: {
                        statusCode: 500,
                    },
                },
                {
                    error: {
                        isAxiosError: true,
                        message: 'another message',
                        status: 321,
                    },
                    response: {
                        statusCode: 500,
                    },
                },
                {
                    error: {
                        isAxiosError: true,
                        response: {
                            status: 123,
                        },
                    },
                    response: {
                        statusCode: 123,
                    },
                },
                {
                    error: {
                        isAxiosError: true,
                        response: {},
                    },
                    response: {
                        statusCode: 500,
                    },
                },
            ];

            describe('next parameter provided', function (): void {
                // eslint-disable-next-line mocha/no-setup-in-describe
                testErrors.forEach((testError: any): void => {
                    it('should forward the error to the next function', function (done: Mocha.Done): void {
                        promiseToResponse(Promise.reject(testError.error), resObj, nextSpy);
                        setTimeout(function (): void {
                            expect(nextSpy.callCount).to.equal(1);
                            expect(statusStub.callCount).to.equal(0);
                            expect(jsonSpy.callCount).to.equal(0);
                            expect(nextSpy.getCall(0).args).to.deep.equal([testError.error]);
                            done();
                        }, 100);
                    });
                });
            });

            describe('next parameter not provided', function (): void {
                // eslint-disable-next-line mocha/no-setup-in-describe
                testErrors.forEach((testError: any): void => {
                    it('should forward the error to the next function', function (done: Mocha.Done): void {
                        promiseToResponse(Promise.reject(testError.error), resObj);
                        setTimeout(function (): void {
                            expect(nextSpy.callCount).to.equal(0);
                            expect(statusStub.callCount).to.equal(1);
                            expect(jsonSpy.callCount).to.equal(1);
                            expect(statusStub.getCall(0).args).to.deep.equal([testError.response.statusCode]);
                            expect(jsonSpy.getCall(0).args).to.deep.equal([
                                {
                                    error: true,
                                    statusCode: testError.response.statusCode,
                                },
                            ]);
                            done();
                        }, 100);
                    });
                });
            });
        });
    });
});
