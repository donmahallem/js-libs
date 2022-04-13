/*
 * Package @donmahallem/turbo-pb
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import express from 'express';
import 'mocha';
import * as protobuf from 'protobufjs';
import * as sinon from 'sinon';
import supertest from 'supertest';
import { formatResponse } from './format-response';
interface ITestMessage {
    message: string;
}

const protoRoot: protobuf.Root = protobuf.loadSync('./test/test.proto');
const testMessage: protobuf.Type = protoRoot.lookupType('testpackage.TestMessage');
const testObject: ITestMessage = { message: 'test' };
const encodedTestMessage: Buffer = Buffer.from(testMessage.encode(testObject).finish());

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

describe('./format-response', (): void => {
    let sandbox: sinon.SinonSandbox;
    let app: express.Application;
    let getResponseBody: sinon.SinonStub;
    let errorSpy: sinon.SinonSpy;
    before((): void => {
        sandbox = sinon.createSandbox();
        getResponseBody = sandbox.stub();
        errorSpy = sandbox.spy();
    });
    beforeEach((): void => {
        app = express();
        app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            formatResponse(getResponseBody(), testMessage, res, next);
        });
        app.use((err: any, req: express.Request, res: express.Response): void => {
            errorSpy(err);
            res.status(406).json({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                message: err.message,
            });
        });
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    it('validate protobuf test message', (): void => {
        const encoded: Uint8Array = testMessage.encode(testObject).finish();
        expect(testMessage.decode(encoded).toJSON()).to.deep.eq(testObject);
    });
    describe('formatResponse', (): void => {
        describe('protobuf response', (): void => {
            it('validate protobuf test message', async (): Promise<void> => {
                getResponseBody.returns(testObject);
                return supertest(app)
                    .get('')
                    .set('Accept', 'application/x-protobuf')
                    .expect(200)
                    .expect('Content-Type', 'application/x-protobuf')
                    .responseType('blob')
                    .then((response: any): void => {
                        expect(response.body).to.deep.equal(encodedTestMessage);
                    });
            });
        });
        describe('json response', (): void => {
            it('validate json test message', async (): Promise<void> => {
                getResponseBody.returns(testObject);
                return supertest(app)
                    .get('')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((response: any): void => {
                        expect(response.body).to.deep.equal(testObject);
                    });
            });
        });
        describe('any other response', (): void => {
            it('should respond with error', async (): Promise<void> => {
                getResponseBody.returns(testObject);
                return supertest(app)
                    .get('')
                    .set('Accept', 'application/pdf')
                    .expect(406)
                    .expect('Content-Type', /json/)
                    .then((response: any): void => {
                        expect(errorSpy.callCount).to.equal(1, 'only one error should be emitted');
                        expect(response.body).to.deep.equal({
                            message: 'Not Acceptable',
                        });
                    });
            });
        });
    });
});
