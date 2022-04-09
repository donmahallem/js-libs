import type { ExecutorContext } from '@nrwl/devkit';
import { Report } from 'c8';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
    textToEcho: string;
}

export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    console.info(`Executing "echo"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);

    const { stdout, stderr } = await promisify(exec)(`echo ${options.textToEcho}`);
    console.log(stdout);
    console.error(stderr);

    const report: Report = new Report({
        include: ['src/*.ts', 'src/**/*.ts'],
        exclude: ['typings', 'src/**/*.spec.ts', '**/*.d.ts'],
        extension: ['.ts'],
        reporter: ['json', 'html', 'text-summary', 'lcov'],
        all: true,
    });
    await report.run();

    const success = !stderr;
    return { success };
}
