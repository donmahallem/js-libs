import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
    textToEcho: string;
}

export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    console.info(`Executing "typedoc"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);
    console.info(`Context: ${JSON.stringify(context, null, 2)}`);

    const k = context.workspace.projects[context.projectName!];

    const { stdout, stderr } = await promisify(exec)(
        `typedoc --options ./typedoc.json --out ${k.root}/docs --entryPoints ${k.sourceRoot}/index.ts`
    );
    console.log(stdout);
    console.error(stderr);

    const success = !stderr;
    return { success };
}
