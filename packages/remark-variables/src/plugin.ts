/*
 * Package @donmahallem/remark-variables
 * Source https://donmahallem.github.io/js-libs/
 */

import { get } from 'dot-prop';
import { Root } from 'mdast';
import { Content, findAndReplace, Node, Parent } from 'mdast-util-find-and-replace';
import { Plugin, Transformer } from 'unified';
import { VFile } from 'vfile';

interface IPluginOptions {
    data: any;
}
/**
 * Remark Plugin for inline template variables
 *
 * @param options
 * @param options.data data to inline
 * @returns Plugin
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const plugin: Plugin =
    (options: IPluginOptions): Transformer =>
    (node: Node | Parent, file: VFile): Node => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: Node & {
            index: number | null;
            map: Node | null;
            endIndex: number | null;
        } = findAndReplace(
            node,
            // eslint-disable-next-line no-useless-escape
            /\{\{[a-zA-Z\.\- ]+\}\}/,
            (match: string): string => {
                const cleanedKey: string = match.slice(2, match.length - 2).trim();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return get(options.data, cleanedKey) || 'unknown';
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any;

        if (result.endIndex === null || result.index === null || result.index === -1 || !result.map) {
            return node;
        }
        const rootNode: Root = node as Root;

        rootNode.children = [
            ...rootNode.children.slice(0, result.index),
            result.map,
            ...rootNode.children.slice(result.endIndex),
        ] as Content[];
        return rootNode;
    };
