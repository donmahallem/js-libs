import { get } from 'dot-prop';
import { findAndReplace, Node } from 'mdast-util-find-and-replace'
import { Root } from 'mdast';
import { Transformer } from 'unified';
/**
 * Plugin to generate a Table of Contents (TOC).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export function plugin(options: { heading?: string, data: any } = { data: {} }): Transformer {
    return (node: Node): Node => {
        const result: Node & {
            index: number | null,
            map: Node | null,
            endIndex: number | null,
        } = findAndReplace(
            node,
            /\{\{[a-zA-Z\.\- ]+\}\}/,
            (match: string): string => {
                const cleanedKey: string = match
                    .slice(2, match.length - 2).trim();
                return get(options.data, cleanedKey) || 'unknown';
            },
        ) as any;

        if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
        ) {
            return node;
        }
        const rootNode: Root = node as Root;

        rootNode.children = [
            ...rootNode.children.slice(0, result.index),
            result.map,
            ...rootNode.children.slice(result.endIndex)
        ] as any[];
        return rootNode;
    }
}
