'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const td = __importStar(require('typedoc'));
const ExitCodes = {
    Ok: 0,
    OptionError: 1,
    NoEntryPoints: 2,
    CompileError: 3,
    ValidationError: 4,
    OutputError: 5,
    ExceptionThrown: 6,
};
async function run(app) {
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
async function echoExecutor(options, context) {
    console.info(`Executing "typedoc"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);
    console.info(`Context: ${JSON.stringify(context, null, 2)}`);
    const k = context.workspace.projects[context.projectName];
    const app = new td.Application();
    app.options.setValue('entryPoints', [path_1.default.join(k.sourceRoot, 'index.ts')]);
    app.options.addReader(new td.TypeDocReader());
    app.options.addReader(new td.TSConfigReader());
    app.options.setValue('entryPoints', [path_1.default.join(k.sourceRoot, 'index.ts')]);
    app.options.setValue('out', [path_1.default.join(k.root, './out')]);
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
exports.default = echoExecutor;
//# sourceMappingURL=impl.js.map
