/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { Package } from '@lerna/package';
import { Project } from '@lerna/project';
import { expect } from 'chai';
import 'mocha';
import { join, sep } from 'path';
import sinon from 'sinon';
import * as index from './update-config';

/* eslint-disable @typescript-eslint/no-unused-expressions, no-unused-expressions */
describe('./update-config', (): void => {
    let sandbox: sinon.SinonSandbox;
    before('setup sandbox', (): void => {
        sandbox = sinon.createSandbox();
    });
    afterEach('reset sandbox', (): void => {
        sandbox.reset();
    });
    after('restore sandbox', (): void => {
        sandbox.restore();
    });
    it('should output the input if no packages are found in the lerna project', async (): Promise<void> => {
        expect(await index.updateConfig(new Project('./../../../'), {})).to.deep.equal({});
    });
    it('should output all lerna packages', async (): Promise<void> => {
        const project: sinon.SinonStubbedInstance<Project> = sandbox.createStubInstance(Project);
        const package1: sinon.SinonStubbedInstance<Package> = sandbox.createStubInstance(Package);
        const package2: sinon.SinonStubbedInstance<Package> = sandbox.createStubInstance(Package);
        sandbox.stub(package1, 'location').get((): string => join(sep, 'root', 'path', 'packages', 'package1'));
        sandbox.stub(package2, 'location').get((): string => join(sep, 'root', 'path', 'packages', 'package2'));
        project.rootPath = join(sep, 'root', 'path');
        project.getPackages.resolves([package1, package2]);
        package1.get.withArgs('name').onCall(0).returns('@package/first');
        package2.get.withArgs('name').onCall(0).returns('@package/second');
        expect(await index.updateConfig(project, {})).to.deep.equal({
            coverage: {
                status: {
                    project: {
                        first: {
                            paths: [join('packages', 'package1')],
                        },
                        second: {
                            paths: [join('packages', 'package2')],
                        },
                    },
                },
            },
        });
    });
    it('should output all missing lerna packages', async (): Promise<void> => {
        const project: sinon.SinonStubbedInstance<Project> = sandbox.createStubInstance(Project);
        const package1: sinon.SinonStubbedInstance<Package> = sandbox.createStubInstance(Package);
        const package2: sinon.SinonStubbedInstance<Package> = sandbox.createStubInstance(Package);
        sandbox.stub(package1, 'location').get((): string => join(sep, 'root', 'path', 'packages', 'package1'));
        sandbox.stub(package2, 'location').get((): string => join(sep, 'root', 'path', 'packages', 'package2'));
        project.rootPath = join(sep, 'root', 'path');
        project.getPackages.resolves([package1, package2]);
        package1.get.withArgs('name').onCall(0).returns('@package/first');
        package2.get.withArgs('name').onCall(0).returns('@package/second');
        expect(
            await index.updateConfig(project, {
                coverage: {
                    status: {
                        project: {
                            first: {
                                paths: [join('packages', 'package3')],
                            },
                        },
                    },
                },
            })
        ).to.deep.equal({
            coverage: {
                status: {
                    project: {
                        first: {
                            paths: [join('packages', 'package3')],
                        },
                        second: {
                            paths: [join('packages', 'package2')],
                        },
                    },
                },
            },
        });
    });
});
