"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("util");
async function echoExecutor(options, context) {
    console.info(`Executing "typedoc"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);
    console.info(`Context: ${JSON.stringify(context, null, 2)}`);
    const k = context.workspace.projects[context.projectName];
    const { stdout, stderr } = await (0, util_1.promisify)(child_process_1.exec)(`typedoc --options ./typedoc.json --out ${k.root}/docs --entryPoints ${k.sourceRoot}/index.ts`);
    console.log(stdout);
    console.error(stderr);
    const success = !stderr;
    return { success };
}
exports.default = echoExecutor;
//# sourceMappingURL=impl%20copy.js.map