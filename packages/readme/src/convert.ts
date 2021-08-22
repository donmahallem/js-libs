/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import remarkLernaPlugin from '@donmahallem/remark-lerna-packages';
import { promises as fsp } from 'fs';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGitContributors from 'remark-git-contributors';
import remarkLicense from 'remark-license';
import remarkParse from 'remark-parse';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkToc from 'remark-toc';
import { read } from 'to-vfile';
import { VFile } from 'vfile';
import { reporter } from 'vfile-reporter';

export async function convert(opts: { dryRun: boolean; input: string; output?: string; report?: boolean }): Promise<void> {
    const output: string = opts.output || opts.input;
    const data: VFile = await read(opts.input);
    return remark()
        .use(remarkToc)
        .use(remarkGfm)
        .use(remarkParse)
        .use(remarkGitContributors)
        .use(remarkLicense)
        .use(remarkPresetLintRecommended)
        .use(remarkLernaPlugin)
        .process(data)
        .then((file: VFile): Promise<void> | void => {
            if (opts.report !== false) {
                console.error(reporter(file));
            }
            if (opts.dryRun) {
                console.log(String(file));
            } else {
                return fsp.writeFile(output, String(file), 'utf-8');
            }
        });
}
