/*
 * Package @donmahallem/remark-variables
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { Processor, unified } from 'unified';
import { plugin } from './plugin';
describe('plugin', (): void => {
    describe('plugin', (): void => {
        it('should set all plugins with default config', async (): Promise<void> => {
            const source = '# Lerna packages\n\ndata\n\n# Lerna\n';
            const processor: Processor = unified().use(remarkParse).use(remarkGfm).use(plugin).use(remarkStringify);
            return processor.process(source).then((value): void => {
                expect(String(value)).to.equal(source);
            });
        });
        it('should accept plugin config variable', async (): Promise<void> => {
            const data = '# Lerna packages\n\n{{ name }}\n\n# Lerna\n';
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plugin, { data: { name: 'asdf' } })
                .use(remarkStringify);
            return processor.process(data).then((value): void => {
                expect(String(value)).to.equal('# Lerna packages\n\nasdf\n\n# Lerna\n');
            });
        });
        it('should keep undefined template variables', async (): Promise<void> => {
            const data = '# Lerna packages\n\n{{ name }}\n\n# Lerna\n';
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plugin, { data: { namee: 'not match' } })
                .use(remarkStringify);
            return processor.process(data).then((value): void => {
                expect(String(value)).to.equal('# Lerna packages\n\n{{ name }}\n\n# Lerna\n');
            });
        });
        it('should work with dot notation variables', async (): Promise<void> => {
            const data = '# Lerna packages\n\n{{ user.name }}\n\n# Lerna\n';
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plugin, { data: { user: { name: 'username' } } })
                .use(remarkStringify);
            return processor.process(data).then((value): void => {
                expect(String(value)).to.equal('# Lerna packages\n\nusername\n\n# Lerna\n');
            });
        });
        it('should work with dot notation variables', async (): Promise<void> => {
            const data = '# Lerna packages\n\n{{ user.name }}\n\n# Lerna\n';
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plugin, { data: { user: { name: 'username' } } })
                .use(remarkStringify);
            return processor.process(data).then((value): void => {
                expect(String(value)).to.equal('# Lerna packages\n\nusername\n\n# Lerna\n');
            });
        });
        it('should work with dot notation variables', async (): Promise<void> => {
            const testData: string = 'Run the following command to install the package:\n\n' + '    npm install {{ pkg.name }}';
            const testOutput: string = 'Run the following command to install the package:\n\n' + '    npm install username';
            const processor: Processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(plugin, { data: { pkg: { name: 'username' } } })
                .use(remarkStringify);
            return processor.process(testData).then((value): void => {
                expect(String(value)).to.equal(testOutput);
            });
        });
    });
});
