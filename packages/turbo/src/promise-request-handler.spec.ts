/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { expect } from 'chai';
import express, { Application } from 'express';
import 'mocha';
import sinon from 'sinon';
import supertest from 'supertest';
import { promiseRequestHandler } from './promise-request-handler';

describe('promise-request-handler.ts', (): void => {
    describe('promiseRequestHandler(()=>Promise))', (): void => {
        let handlerStub: sinon.SinonStub;
        let app: Application;
        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            handlerStub = sandbox.stub();
            app = express();
            app.use(promiseRequestHandler(handlerStub));
        });
        afterEach((): void => {
            sandbox.reset();
        });
        describe('promise resolves', (): void => {
            it('should forward the resolved value to the response', (): Promise<void> => {
                handlerStub.returns(Promise.resolve('test'));
                return supertest(app)
                    .get('')
                    .expect(200)
                    .then((resp: supertest.Response): void => {
                        expect(resp.body).to.equal('test');
                    });
            });
        });
        describe('promise reject', (): void => {
            it('should forward the resolved value to the response', (): Promise<void> => {
                handlerStub.returns(Promise.reject('test'));
                return supertest(app)
                    .get('')
                    .expect(500)
                    .then((resp: supertest.Response): void => {
                        expect(resp.body).to.deep.equal({});
                    });
            });
        });
    });
});
