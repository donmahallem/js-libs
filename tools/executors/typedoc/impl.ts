import type { ExecutorContext } from '@nrwl/devkit';
import path from 'path';
import * as td from 'typedoc';

export interface EchoExecutorOptions {
    textToEcho: string;
}

const ExitCodes = {
    Ok: 0,
    OptionError: 1,
    NoEntryPoints: 2,
    CompileError: 3,
    ValidationError: 4,
    OutputError: 5,
    ExceptionThrown: 6,
};

async function run(app: td.Application) {
    if (app.options.getValue('entryPoints').length === 0) {
        app.logger.error('No entry points provided');
        return ExitCodes.NoEntryPoints;
    }

    const project = app.convert();
    if (!project) {
        return ExitCodes.CompileError;
    }
    if (app.options.getValue('treatWarningsAsErrors') && app.logger.hasWarnings()) {
        return ExitCodes.CompileError;
    }
    console.log(project);
    app.validate(project);
    if (app.logger.hasErrors()) {
        return ExitCodes.ValidationError;
    }
    if (app.options.getValue('treatWarningsAsErrors') && app.logger.hasWarnings()) {
        return ExitCodes.ValidationError;
    }

    if (app.options.getValue('emit') !== 'none') {
        const out = app.options.getValue('out');
        if (out) {
            await app.generateDocs(project, out);
        }
        const json = app.options.getValue('json');
        if (json) {
            await app.generateJson(project, json);
        }

        if (!out && !json) {
            await app.generateDocs(project, './docs');
        }

        if (app.logger.hasErrors()) {
            return ExitCodes.OutputError;
        }
        if (app.options.getValue('treatWarningsAsErrors') && app.logger.hasWarnings()) {
            return ExitCodes.OutputError;
        }
    }

    return ExitCodes.Ok;
}
export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    console.info(`Executing "typedoc"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);
    console.info(`Context: ${JSON.stringify(context, null, 2)}`);

    const k = context.workspace.projects[context.projectName!];
    const app: td.Application = new td.Application();
    app.options.setValue('entryPoints', [path.join(k.sourceRoot!, 'index.ts')]);
    app.options.addReader(new td.TypeDocReader());
    app.options.addReader(new td.TSConfigReader());
    app.options.setValue('entryPoints', [path.join(k.sourceRoot!, 'index.ts')]);
    app.options.setValue('out', [path.join(k.root!, './out')]);
    // app.options.addReader(new td.ArgumentsReader(300));

    app.bootstrap();

    return await run(app)
        .catch((error) => {
            console.error('TypeDoc exiting with unexpected error:');
            console.error(error);
            return ExitCodes.ExceptionThrown;
        })
        .then((exitCode) => {
            return { success: exitCode === ExitCodes.Ok };
        });
}
