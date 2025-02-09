/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { expect } from 'chai';
import express, { Application } from 'express';
import 'mocha';
import sinon from 'sinon';
import supertest from 'supertest';
import { promiseRequestHandler } from './promise-request-handler.js';

describe('promise-request-handler.ts', function (): void {
    describe('promiseRequestHandler(()=>Promise))', function (): void {
        let handlerStub: sinon.SinonStub;
        let app: Application;
        let sandbox: sinon.SinonSandbox;

        before(function (): void {
            sandbox = sinon.createSandbox();
            handlerStub = sandbox.stub();
            app = express();
            app.use(promiseRequestHandler(handlerStub));
        });

        afterEach(function (): void {
            sandbox.reset();
        });

        describe('promise resolves', function (): void {
            it('should forward the resolved value to the response', function (): Promise<void> {
                handlerStub.returns(Promise.resolve('test'));
                return supertest(app)
                    .get('')
                    .expect(200)
                    .then((resp: supertest.Response): void => {
                        expect(resp.body).to.equal('test');
                    });
            });
        });

        describe('promise reject', function (): void {
            it('should forward the resolved value to the response', function (): Promise<void> {
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
