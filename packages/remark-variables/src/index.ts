/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-toc').Options} Options
 */

import { findAndReplace, Node } from 'mdast-util-find-and-replace'
import { Parent, Root } from 'mdast';
import { Plugin, Transformer } from 'unified';
/**
 * Plugin to generate a Table of Contents (TOC).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkToc(options: { heading?: string } = {}): Transformer {
    return (node: Node): Node => {
        const result: Node = findAndReplace(
            node,
            Object.assign({}, options, {
                heading: options.heading || 'toc|table[ -]of[ -]contents?'
            })
        )

        if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
        ) {
            return
        }
        const rootNode: Root = node as Root;

        rootNode.children = [
            ...rootNode.children.slice(0, result.index),
            result.map,
            ...rootNode.children.slice(result.endIndex)
        ]
        return rootNode;
    }
}
