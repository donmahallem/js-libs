/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import { Command as cmd } from 'commander';
import { promises as fsp } from 'fs';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGitContributors from 'remark-git-contributors';
import remarkLicense from 'remark-license';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
import { read } from 'to-vfile';
import { VFile } from 'vfile';
import { reporter } from 'vfile-reporter';
async function run(opts: { dryRun: boolean; input: string; output?: string }): Promise<void> {
    const output: string = opts.output || opts.input;
    console.log('Updating readme with', opts.input, '=>', output);
    const data: VFile = await read(opts.input);
    return (
        remark()
            .use(remarkToc)
            .use(remarkGfm)
            .use(remarkParse)
            .use(remarkGitContributors)
            .use(remarkLicense)
            // .use(remarkPresetLintRecommended)
            .process(data)
            .then((file: VFile): Promise<void> | void => {
                console.error(reporter(file));
                if (opts.dryRun) {
                    console.log(String(file));
                } else {
                    return fsp.writeFile(output, String(file), 'utf-8');
                }
            })
    );
}

async function main() {
    const prg = new cmd()
        .version('0.0.1')
        .requiredOption('-i, --input <type>', 'input file required')
        .option('-o, --output <type>', 'output file required')
        .option('-d, --dry-run <dryrun>', 'run in dry-run mode', false)
        .description('Converts <input> markdown to <output> markdown')
        .action(run);
    await prg.parseAsync(process.argv);
}

main()
    .then((): void => {
        console.log('File converted');
    })
    .catch(console.error);
