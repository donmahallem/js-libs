/*
 * Package @donmahallem/remark-lerna-packages
 * Source https://donmahallem.github.io/js-libs/
 */

import { Package } from '@lerna/package';
import { expect } from 'chai';
import { readFile } from 'fs/promises';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { Processor, unified } from 'unified';
import { Node } from 'unist-builder';
import { createRowFromPackage, plug } from './plugin';
describe('index', (): void => {
    describe('plug', (): void => {
        it('should set all plugins with default config', async (): Promise<void> => {
            const data = '# Lerna packages\n\ndata\n\n # Lerna\n';
            const expectedTree: any = JSON.parse(await readFile('./test/expect.json', 'utf-8'));
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plug, { lernaConfig: './test' })
            const parsedData: any = processor.parse(data);
            return processor.run(parsedData)
                .then((value: any): void => {
                    expect(value).to.be.instanceOf(Object);
                    expect(expectedTree).to.be.instanceOf(Object);
                    expect(value).to.deep.equal(expectedTree);
                });
        });
    });
    describe('createRowFromPackage', (): void => {
        it('should create row with homepage and title', (): void => {
            const row: Node = createRowFromPackage(Package.lazy({
                name: 'pck1',
                homepage: 'test.url',
                description: 'package description',
            }));

            expect(row)
                .to.deep.equal({
                    "type": "tableRow",
                    "children": [{
                        "type": "tableCell",
                        "children": [{
                            "type": "link",
                            "url": "test.url",
                            "title": "package description",
                            "children": [{ "type": "text", "value": "pck1" }]
                        }]
                    },
                    { "type": "tableCell", "children": [{ "type": "text", "value": "<a href=\"https://badge.fury.io/js/pck1\"><img alt=\"npm version\" src=\"https://badge.fury.io/js/pck1.svg\" height=\"20\"/></a>" }] }]
                });
        });
    });
});
