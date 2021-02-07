/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { expect } from 'chai';
import 'mocha';
import { RequestError } from './request-error';

describe('./request-error', (): void => {
    const testStatuses: any[] = [undefined, 200, 333];
    const testMessages: string[] = ['test1', 'test2'];
    describe('RequestError', (): void => {
        testStatuses.forEach((testStatus: any): void => {
            const expectedStatus: number = testStatus || 500;
            testMessages.forEach((testMessage: string): void => {
                it(`should create a new RequestError(${testMessage},${expectedStatus})`, (): void => {
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
