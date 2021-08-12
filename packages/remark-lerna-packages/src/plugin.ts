/*
 * Package @donmahallem/remark-lerna-packages
 * Source https://donmahallem.github.io/js-libs/
 */

import { Package } from '@lerna/package';
import { getPackages } from '@lerna/project';
import { headingRange } from 'mdast-util-heading-range';
import { resolve as pathResolve } from 'path';
import { Plugin, Transformer } from 'unified';
import { Node, Parent } from 'unist';
import { u } from 'unist-builder';
import { VFile } from 'vfile';
import { findUpOne } from 'vfile-find-up'

const extractPackages = async (path: string): Promise<Package[]> => {
    const packages: Package[] = getPackages(path);
    return packages;
}

function createVersionLabel(packageName: string) {
    const encodedName = encodeURIComponent(packageName);
    return `<a href="https://badge.fury.io/js/${encodedName}"><img alt="npm version" `
        + `src="https://badge.fury.io/js/${encodedName}.svg" height="20"/></a>`;
}
export const createRowFromPackage = (pkg: Package): Node => {
    const homepage: string | undefined = pkg.get('homepage');
    const title: string | undefined = pkg.get('description');
    let titleNode: any;
    if (homepage) {
        const titleNodeOptions: any = {
            url: homepage,
        };
        if (title) {
            titleNodeOptions.title = title;
        }
        titleNode = u('link', titleNodeOptions, [u('text', pkg.name)]);
    } else {
        titleNode = u('text', pkg.name);
    }
    const cells: any[] = [
        u('tableCell', [titleNode]),
        (pkg.get('private') === true) ?
            u('tableCell', [u('text', pkg.version)]) :
            u('tableCell', [u('text', createVersionLabel(pkg.name))])
    ];
    return u('tableRow', cells);
}
export interface IPluginOptions {
    /**
     * Optional path to the lerna config to be used
     */
    lernaConfig?: string;
}

export const remarkLernaPlugings: Plugin = (...args: IPluginOptions[]): Transformer =>
    async (node: Node | Parent, file: VFile): Promise<Node> => {
        const base: string = file.dirname ? pathResolve(file.cwd, file.dirname) : pathResolve(file.cwd);
        const lernaConfigPath: string = args[0]?.lernaConfig || (await findUpOne('lerna.json', base)).path;
        const rows: Node[] = [u('tableRow', [
            u('tableCell', [u('text', 'Package Name')]),
            u('tableCell', [u('text', 'Version')])
        ])];
        rows.push(... (await extractPackages(lernaConfigPath))
            .map((val: Package): Node => createRowFromPackage(val)));
        headingRange(node as any, 'Lerna Packages', (start, nodes: Node[], end) => {
            return [start, u('table', { align: [] }, rows), end];
        });
        return node;
    };
