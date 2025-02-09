/**
 * Package @donmahallem/sync-gist
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import * as esmock from 'esmock';
import 'mocha';
import { basename, resolve } from 'node:path';
import sinon from 'sinon';
import { loadFileContent } from './load-file-content';
import { InputFileContent, IInputFile } from './types';
import type { readFile } from 'node:fs/promises';

type ReadFileStub = sinon.SinonStub<Parameters<typeof readFile>, ReturnType<typeof readFile>>;
const testSources: string[] = ['//absolute/path.js', 'relative/path.js', 'file.js'];
const testFilenames: (string | undefined)[] = ['final.js', 'README.md', undefined];

const testInputFiles: IInputFile[] = [];
testSources.forEach((source: string): void => {
    testFilenames.forEach((filename?: string): void => {
        testInputFiles.push({
            filename,
            source,
        });
    });
});
describe('./load-file-content', function (): void {
    let testMethod: typeof loadFileContent;
    let sandbox: sinon.SinonSandbox;
    let readFileStub: ReadFileStub;
    let resolveStub: sinon.SinonStub;

    before(async function (): Promise<void> {
        sandbox = sinon.createSandbox();
        readFileStub = sandbox.stub().named('readFile') as ReadFileStub;
        resolveStub = sandbox.stub().named('resolve').callsFake(resolve);

        testMethod = (
            await esmock.strict('./load-file-content', {
                'node:fs/promises': { readFile: readFileStub },
                'node:path': {
                    basename,
                    resolve: resolveStub,
                },
            })
        ).loadFileContent;
    });

    afterEach(function (): void {
        sandbox.reset();
    });

    after(function (): void {
        sandbox.restore();
    });
    const fileBody: string = 'filebody';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testCwds: any[] = [undefined, '//test'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, mocha/no-setup-in-describe
    testCwds.forEach((testCwd: any): void => {
        describe(`loadFileContent(~InputFile~${testCwd ? `,${testCwd}` : ''})`, function (): void {
            // eslint-disable-next-line mocha/no-setup-in-describe
            testInputFiles.forEach((testInputFile: IInputFile): void => {
                // eslint-disable-next-line mocha/no-setup-in-describe
                describe(`with input file ${JSON.stringify(testInputFile)}`, function (): void {
                    // eslint-disable-next-line mocha/no-setup-in-describe
                    const expectedFilename: string = testInputFile.filename ? testInputFile.filename : basename(testInputFile.source);
                    // eslint-disable-next-line mocha/no-setup-in-describe
                    const expectedSourcePath: string = testCwd ? resolve(testCwd, testInputFile.source) : resolve(testInputFile.source);

                    it(`should export defaults${testInputFile.source}`, async function (): Promise<void> {
                        readFileStub.resolves(fileBody);
                        resolveStub.returns(expectedSourcePath);

                        return testMethod(testInputFile, testCwd).then((f: InputFileContent): void => {
                            expect(f).to.deep.equal({
                                content: fileBody,
                                filename: expectedFilename,
                                source: expectedSourcePath,
                            });
                            expect(readFileStub.callCount).to.equal(1, 'readFile should be called once');
                            expect(resolveStub.callCount).to.equal(1, 'resolve should be called once');
                            expect(resolveStub.args[0]).to.deep.equal(testCwd ? [testCwd, testInputFile.source] : [testInputFile.source]);
                            expect(readFileStub.args[0]).to.deep.equal([expectedSourcePath, 'utf-8']);
                        });
                    });
                });
            });
        });
    });
});
