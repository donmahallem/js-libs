/*
 * Package @donmahallem/remark-lerna-packages
 * Source https://donmahallem.github.io/js-libs/
 */

import { Package } from '@lerna/package';
import { expect } from 'chai';
import { promises as fsp } from 'fs';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { Processor, unified } from 'unified';
import { Node } from 'unist-builder';
import { createRowFromPackage, remarkLernaPlugin } from './plugin';
describe('index', (): void => {
    describe('plug', (): void => {
        it('should set all plugins with default config', async (): Promise<void> => {
            const data = '# Lerna packages\n\ndata\n\n # Lerna\n';
            const expectedTree: Node = JSON.parse(await fsp.readFile('./test/expect.json', 'utf-8')) as Node;
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkLernaPlugin, { lernaConfig: './test' })
            const parsedData: Node = processor.parse(data);
            return processor.run(parsedData)
                .then((value: Node): void => {
                    expect(value).to.be.instanceOf(Object);
                    expect(expectedTree).to.be.instanceOf(Object);
                    expect(value).to.deep.equal(expectedTree);
                });
        });
    });
    describe('createRowFromPackage', (): void => {
        it('should create row with homepage and title', (): void => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const row: Node = createRowFromPackage(Package.lazy({
                description: 'package description',
                homepage: 'test.url',
                name: 'pck1',
            }));

            expect(row)
                .to.deep.equal({
                    children: [{
                        children: [{
                            children: [{
                                type: 'text',
                                value: 'pck1'
                            }],
                            title: 'package description',
                            type: 'link',
                            url: 'test.url',
                        }],
                        type: 'tableCell',
                    },
                    {
                        children: [{
                            type: 'text',
                            value: '<a href="https://badge.fury.io/js/pck1"><img alt="npm version"' +
                                ' src="https://badge.fury.io/js/pck1.svg" height="20"/></a>',
                        }],
                        type: 'tableCell',
                    }],
                    type: 'tableRow',
                });
        });
    });
});
