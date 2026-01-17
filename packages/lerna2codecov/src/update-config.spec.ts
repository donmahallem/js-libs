/**
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { Package } from '@lerna/package';
import { Project } from '@lerna/project';
import { expect } from 'chai';
import 'mocha';
import { join, sep } from 'node:path';
import sinon from 'sinon';
import * as index from './update-config.js';

describe('./update-config', function (): void {
    let sandbox: sinon.SinonSandbox;

    before('setup sandbox', function (): void {
        sandbox = sinon.createSandbox();
    });

    afterEach('reset sandbox', function (): void {
        sandbox.reset();
    });

    after('restore sandbox', function (): void {
        sandbox.restore();
    });

    it('should output all lerna packages', async function (): Promise<void> {
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

    it('should output all missing lerna packages', async function (): Promise<void> {
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
