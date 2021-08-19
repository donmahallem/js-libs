
import { Command as cmd } from 'commander';
import { convert } from './convert';
export async function command() {
    const prg = new cmd()
        .version('0.0.1')
        .requiredOption('-i, --input <type>', 'input file required')
        .option('-o, --output <type>', 'output file required')
        .option('-d, --dry-run <dryrun>', 'run in dry-run mode', false)
        .description('Converts <input> markdown to <output> markdown')
        .action(convert);
    await prg.parseAsync(process.argv);
}
