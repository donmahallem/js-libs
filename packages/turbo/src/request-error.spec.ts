/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { expect } from 'chai';
import 'mocha';
import { RequestError } from './request-error.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('./request-error', function (): void {
    const testStatuses: any[] = [undefined, 200, 333];
    const testMessages: string[] = ['test1', 'test2'];

    describe('RequestError', function (): void {
        // eslint-disable-next-line mocha/no-setup-in-describe
        testStatuses.forEach((testStatus: number | undefined): void => {
            const expectedStatus: number = testStatus || 500;
            testMessages.forEach((testMessage: string): void => {
                it(`should create a new RequestError(${testMessage},${expectedStatus})`, function (): void {
                    const error: RequestError = new RequestError(testMessage, testStatus);
                    expect(error.message).to.equal(error.message);
                    expect(error.status).to.equal(error.status);
                    expect(error).to.be.instanceOf(RequestError);
                    expect(error.name).to.equal('RequestError');
                });
            });
        });
    });
});
