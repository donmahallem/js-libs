/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-rxjs
 */

import { expect } from 'chai';
import express from 'express';
import 'mocha';
import { of, throwError } from 'rxjs';
import * as sinon from 'sinon';
import supertest from 'supertest';
import { expressObserver } from './express-observer';

interface ITestMessage {
    message: string;
}

const testObject: ITestMessage = { message: 'test' };
const testError: Error = new Error('This is a test error');
describe('./express-observer', (): void => {
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
        app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
            of(testObject).subscribe(expressObserver(res, next));
        });
        app.get('/error', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
            throwError(testError).subscribe(expressObserver(res, next));
        });
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            errorSpy(err);
            res
                .status(406)
                .json({
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
    describe('expressObserver', (): void => {
        describe('protobuf response', (): void => {
            it('validate protobuf test message', async (): Promise<void> => {
                getResponseBody.returns(testObject);
                return supertest(app)
                    .get('')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((response: any): void => {
                        expect(response.body).to.deep.equal(testObject);
                    });
            });
        });
        describe('json response', (): void => {
            it('validate json test message', async (): Promise<void> => {
                getResponseBody.returns(testObject);
                return supertest(app)
                    .get('')
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
                    .get('/error')
                    .expect(406)
                    .expect('Content-Type', /json/)
                    .then((response: any): void => {
                        expect(errorSpy.callCount).to.equal(1, 'only one error should be emitted');
                        expect(response.body).to.deep.equal({
                            message: 'This is a test error',
                        });
                    });
            });
        });
    });
});
