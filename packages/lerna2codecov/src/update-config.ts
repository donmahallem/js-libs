/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { Package } from '@lerna/package';
import { Project } from '@lerna/project';
import deepmerge from 'deepmerge';
import { relative } from 'path';
import { CodecovProjects, ICodecovConfig } from './codecov-config';


export interface IUpdateOptions {
    stripScope?: boolean;
}

function stripScope(packageName: string | Package): string {
    if (packageName instanceof Package) {
        return stripScope(packageName.get('name'));
    }
    const sliced: string[] = packageName.split('/');
    return sliced.length > 1 ? sliced.slice(1).join('/') : packageName;
}

export async function updateConfig(project: Project, codecovCfg: ICodecovConfig, opts?: IUpdateOptions): Promise<ICodecovConfig> {
    const stripScopeInName: boolean = opts?.stripScope || true;
    const packages: Package[] = await project.getPackages();
    if (packages.length === 0) {
        return codecovCfg;
    }
    const codecovProjects: CodecovProjects = {};
    const sourcePackages: CodecovProjects = codecovCfg?.coverage?.status?.project || {};
    for (let pkg of packages) {
        const stripedPackageName: string = stripScopeInName ? stripScope(pkg) : pkg.get('name');
        if (stripedPackageName in sourcePackages) {
            continue;
        }
        codecovProjects[stripedPackageName] = {
            paths: [
                relative(project.rootPath, pkg.location),
            ]
        }
    }
    return deepmerge(codecovCfg, {
        coverage: {
            status: {
                project: codecovProjects,
            }
        }
    });
}
