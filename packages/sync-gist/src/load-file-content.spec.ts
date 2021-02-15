/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { expect } from 'chai';
import { promises as fsp } from 'fs';
import 'mocha';
import { basename, resolve } from 'path';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { loadFileContent } from './load-file-content';
import { InputFileContent, IInputFile } from './types';

type ReadFileParameters = Parameters<typeof fsp['readFile']>;
type ReadFileReturnType = ReturnType<typeof fsp['readFile']>;

const testSources: string[] = ['//absolute/path.js',
    'relative/path.js',
    'file.js'];
const testFilenames: string[] = ['final.js', 'README.md'];

const testInputFiles: IInputFile[] = [];
testSources
    .forEach((source: string): void => {
        testFilenames.forEach((filename: string): void => {
            testInputFiles.push({
                filename,
                source,
            });
        });
    });
describe('./load-file-content', (): void => {
    let testMethod: typeof loadFileContent;
    let sandbox: sinon.SinonSandbox;
    let readFileStub: sinon.SinonStub<ReadFileParameters, ReadFileReturnType>;
    let resolveStub: sinon.SinonStub;
    before((): void => {
        sandbox = sinon.createSandbox();
        readFileStub = sandbox.stub();
        resolveStub = sandbox.stub();
    });
    beforeEach((): void => {
        testMethod = proxyquire('./load-file-content', {
            fs: {
                promises: {
                    readFile: readFileStub,
                },
            },
            path: {
                resolve: resolveStub,
            },
        }).loadFileContent;
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    const fileBody: string = 'filebody';
    const testCwds: any[] = [undefined, '//test'];
    testCwds.forEach((testCwd: any): void => {
        describe(`loadFileContent(~InputFile~${testCwd ? `,${testCwd}` : ''})`, (): void => {
            testInputFiles.forEach((testInputFile: IInputFile): void => {
                describe(`with input file ${JSON.stringify(testInputFile)}`, (): void => {
                    const expectedFilename: string = testInputFile.filename ?
                        testInputFile.filename :
                        basename(testInputFile.source);
                    const expectedSourcePath: string = testCwd ?
                        resolve(testCwd, testInputFile.source) :
                        resolve(testInputFile.source);
                    it(`should export defaults${testInputFile.source}`, (): Promise<void> => {
                        readFileStub.resolves(fileBody);
                        resolveStub.returns(expectedSourcePath);
                        return testMethod(testInputFile, testCwd)
                            .then((f: InputFileContent): void => {
                                expect(f).to.deep.equal({
                                    content: fileBody,
                                    filename: expectedFilename,
                                    source: expectedSourcePath,
                                });
                                expect(readFileStub.callCount).to.equal(1, 'readFile should be called once');
                                expect(resolveStub.callCount).to.equal(1, 'resolve should be called once');
                                expect(resolveStub.args[0]).to.deep
                                    .equal(testCwd ? [testCwd, testInputFile.source] : [testInputFile.source]);
                                expect(readFileStub.args[0]).to.deep.equal([expectedSourcePath, 'utf-8']);
                            });
                    });
                });
            });
        });
    });
});
