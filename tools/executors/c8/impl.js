"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c8_1 = require("c8");
const child_process_1 = require("child_process");
const util_1 = require("util");
async function echoExecutor(options, context) {
    console.info(`Executing "echo"...`);
    console.info(`Options: ${JSON.stringify(options, null, 2)}`);
    const { stdout, stderr } = await (0, util_1.promisify)(child_process_1.exec)(`echo ${options.textToEcho}`);
    console.log(stdout);
    console.error(stderr);
    const report = new c8_1.Report({
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
exports.default = echoExecutor;
//# sourceMappingURL=impl.js.map