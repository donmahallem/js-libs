
import { Command, } from 'commander';
import { resolve } from 'path';
import { update } from './update';

interface IUpdateOptions {
    codecov: string;
    lerna: string;
}
function resolvePath(path: string): string {
    return resolve(path);
}
export function updateCommand(opts?: { exitOverride: boolean }): Command {
    const program: Command = new Command('lerna2codecov');
    program
        /**
         * version gets replaced by rollup
         */
        .version('__BUILD_VERSION__')
        .addHelpText('beforeAll', 'Update script for codecov configs');
    const updateCommand: Command = new Command('update');
    if (opts?.exitOverride) {
        program.exitOverride();
        updateCommand.exitOverride();
    }
    updateCommand.description('Updates the codecov.yml with information from lerna.json file')
        .requiredOption('-l, --lerna <path>', 'path to lerna root folder', resolvePath)
        .requiredOption('-c, --codecov <path>', 'path to codecov.yml', resolvePath)
        .usage('-c <codecov file path> -l <lerna root folder>')
        .action(async (opts: IUpdateOptions, cmd: Command): Promise<void> => {
            await update(opts.lerna, opts.codecov);
        }).addHelpText('after', '\nExamples:\n update -l ./path/to/lerna -c codecov.yml');
    program.addCommand(updateCommand);
    return program;
}
