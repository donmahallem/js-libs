/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import commander from 'commander';
import { convert } from './convert';
export async function command(): Promise<commander.Command> {
    const prg = new commander.Command()
        .version('0.0.1')
        .requiredOption('-i, --input <type>', 'input file required')
        .option('-o, --output <type>', 'output file required')
        .option('-d, --dry-run <dryrun>', 'run in dry-run mode', false)
        .description('Converts <input> markdown to <output> markdown')
        .action(convert);
    return await prg.parseAsync(process.argv);
}
