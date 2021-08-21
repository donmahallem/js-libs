/*
 * Package @donmahallem/remark-variables
 * Source https://donmahallem.github.io/js-libs/
 */

import { get } from 'dot-prop';
import { Root } from 'mdast';
import { Content, findAndReplace, Node } from 'mdast-util-find-and-replace';
import { Transformer } from 'unified';

/**
 * Remark Plugin for inline template variables
 *
 * @param options
 * @param options.data data to inline
 * @returns Plugin
 */
export function plugin(options: { data: { [key: string]: string } } = { data: {} }): Transformer {
    return (node: Node): Node => {
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
}
