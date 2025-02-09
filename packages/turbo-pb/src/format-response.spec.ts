/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-pb
 */

import { expect } from 'chai';
import express from 'express';
import 'mocha';
import protobuf from 'protobufjs';
import * as sinon from 'sinon';
import supertest from 'supertest';
import { formatResponse } from './format-response';
interface ITestMessage {
    message: string;
}

const protoRoot: protobuf.Root = new protobuf.Root().loadSync('./test/test.proto');
const testMessage: protobuf.Type = protoRoot.lookupType('testpackage.TestMessage');
const testObject: ITestMessage = { message: 'test' };
const encodedTestMessage: Buffer = Buffer.from(testMessage.encode(testObject).finish());
describe('./format-response', function (): void {
    let sandbox: sinon.SinonSandbox;
    let app: express.Application;
    let getResponseBody: sinon.SinonStub;
    let errorSpy: sinon.SinonSpy;

    before(function (): void {
        sandbox = sinon.createSandbox();
        getResponseBody = sandbox.stub();
        errorSpy = sandbox.spy();
    });

    beforeEach(function (): void {
        app = express();
        app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            formatResponse(getResponseBody(), testMessage, res, next);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            errorSpy(err);
            res.status(406).json({
                message: err.message,
            });
        });
    });

    afterEach(function (): void {
        sandbox.reset();
    });

    after(function (): void {
        sandbox.restore();
    });

    it('validate protobuf test message', function (): void {
        const encoded: Uint8Array = testMessage.encode(testObject).finish();
        expect(testMessage.decode(encoded).toJSON()).to.deep.eq(testObject);
    });

    describe('formatResponse', function (): void {
        describe('protobuf response', function (): void {
            it('validate protobuf test message', async function (): Promise<void> {
                getResponseBody.returns(testObject);
                return (
                    supertest(app)
                        .get('')
                        .set('Accept', 'application/x-protobuf')
                        .expect(200)
                        .expect('Content-Type', 'application/x-protobuf')
                        .responseType('blob')
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .then((response: any): void => {
                            expect(response.body).to.deep.equal(encodedTestMessage);
                        })
                );
            });
        });

        describe('json response', function (): void {
            it('validate json test message', async function (): Promise<void> {
                getResponseBody.returns(testObject);
                return (
                    supertest(app)
                        .get('')
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .then((response: any): void => {
                            expect(response.body).to.deep.equal(testObject);
                        })
                );
            });
        });

        describe('any other response', function (): void {
            it('should respond with error', async function (): Promise<void> {
                getResponseBody.returns(testObject);
                return (
                    supertest(app)
                        .get('')
                        .set('Accept', 'application/pdf')
                        .expect(406)
                        .expect('Content-Type', /json/)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .then((response: any): void => {
                            expect(errorSpy.callCount).to.equal(1, 'only one error should be emitted');
                            expect(response.body).to.deep.equal({
                                message: 'Not Acceptable',
                            });
                        })
                );
            });
        });
    });
});
