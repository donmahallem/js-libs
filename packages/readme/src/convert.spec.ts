/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import { promises as fsp } from 'fs';
import 'mocha';
import { after } from 'mocha';
import Sinon from 'sinon';
import * as convert from './convert';

describe('convert', (): void => {
    let sandbox: Sinon.SinonSandbox;
    before('setup sandbox', (): void => {
        sandbox = Sinon.createSandbox();
    });
    afterEach('reset sandbox', (): void => {
        sandbox.reset();
    });
    after('restore sandbox', (): void => {
        sandbox.restore();
    });
    describe('convert', (): void => {
        let logStub: Sinon.SinonStub;
        let errorStub: Sinon.SinonStub;
        let fsWrite: Sinon.SinonStub;
        const expectedOutputs: string[] = [];
        before('stub console.log/error', async (): Promise<void> => {
            expectedOutputs.push(await fsp.readFile('./tests/test1.md', 'utf-8'));
            logStub = sandbox.stub(console, 'log');
            errorStub = sandbox.stub(console, 'error');
            fsWrite = sandbox.stub(fsp, 'writeFile');
        });
        after('restore stubs', (): void => {
            logStub.restore();
            errorStub.restore();
            fsWrite.restore();
        });
        describe('run in dry run mode', (): void => {
            it('should not report VFile messages to cli if report=false', async (): Promise<void> => {
                return convert
                    .convert({
                        dryRun: true,
                        input: './tests/test1.md',
                        report: false,
                    })
                    .then((): void => {
                        expect(logStub.callCount).to.equal(1);
                        expect(errorStub.callCount).to.equal(0, 'should not log lint messages');
                        expect(fsWrite.callCount).to.equal(0, 'should not output file');
                        expect(logStub.getCall(0).args[0]).to.equal(expectedOutputs[0]);
                    });
            });
            it('should report VFile messages to cli if report=true', async (): Promise<void> => {
                return convert
                    .convert({
                        dryRun: true,
                        input: './tests/test1.md',
                        report: true,
                    })
                    .then((): void => {
                        expect(logStub.callCount).to.equal(1);
                        expect(errorStub.callCount).to.equal(1, 'should log lint messages');
                        expect(fsWrite.callCount).to.equal(0, 'should not output file');
                        expect(logStub.getCall(0).args[0]).to.equal(expectedOutputs[0]);
                    });
            });
            it('should report VFile messages to cli if report=undefined', async (): Promise<void> => {
                return convert
                    .convert({
                        dryRun: true,
                        input: './tests/test1.md',
                    })
                    .then((): void => {
                        expect(logStub.callCount).to.equal(1);
                        expect(errorStub.callCount).to.equal(1, 'should log lint messages');
                        expect(fsWrite.callCount).to.equal(0, 'should not output file');
                        expect(logStub.getCall(0).args[0]).to.equal(expectedOutputs[0]);
                    });
            });
        });
        describe('run not in dry run mode', (): void => {
            it('should output to input file if no output specified', async (): Promise<void> => {
                return convert
                    .convert({
                        dryRun: false,
                        input: './tests/test1.md',
                        report: false,
                    })
                    .then((): void => {
                        expect(logStub.callCount).to.equal(0, 'should not log to console');
                        expect(errorStub.callCount).to.equal(0, 'should not log lint messages');
                        expect(fsWrite.callCount).to.equal(1, 'should output to file');
                        expect(fsWrite.getCall(0).args).to.deep.equal(['./tests/test1.md', expectedOutputs[0], 'utf-8']);
                    });
            });
            it('should output to output file if output specified', async (): Promise<void> => {
                return convert
                    .convert({
                        dryRun: false,
                        input: './tests/test1.md',
                        output: './tests/test1_output.md',
                        report: true,
                    })
                    .then((): void => {
                        expect(logStub.callCount).to.equal(0, 'should not log to console');
                        expect(errorStub.callCount).to.equal(1, 'should log lint messages');
                        expect(fsWrite.callCount).to.equal(1, 'should output to file');
                        expect(fsWrite.getCall(0).args).to.deep.equal(['./tests/test1_output.md', expectedOutputs[0], 'utf-8']);
                    });
            });
        });
    });
});
