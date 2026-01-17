/**
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { expect } from 'chai';
import { Command } from 'commander';
import esmock from 'esmock';
import 'mocha';
import sinon from 'sinon';
import type { update } from './update.js';
import type { updateCommand } from './update-command.js';

type UpdateStub = sinon.SinonStub<Parameters<typeof update>, ReturnType<typeof update>>;

describe('./update-command', function (): void {
    let sandbox: sinon.SinonSandbox;
    let updateStub: UpdateStub;
    let updateCommandMethod: typeof updateCommand;
    /**
     * @returns test cmd
     */
    function setupTestCommand(): Command {
        const cmd: Command = updateCommandMethod({ exitOverride: true });
        cmd.configureOutput({
            writeErr: () => {},

            writeOut: () => {},
        });
        return cmd;
    }

    before('setup sandbox', async function (): Promise<void> {
        sandbox = sinon.createSandbox();
        updateStub = sandbox.stub().named('update') as UpdateStub;

        updateCommandMethod = (
            await esmock.strict(
                './update-command',
                {},
                {
                    './update': { update: updateStub },
                }
            )
        ).updateCommand as typeof updateCommand;
    });

    afterEach('reset sandbox', function (): void {
        sandbox.reset();
    });

    after('restore sandbox', function (): void {
        sandbox.restore();
    });

    it('should output all lerna packages', async function (): Promise<void> {
        updateStub.resolves();
        await setupTestCommand().parseAsync(['update', '-l', './', '-c', './codecov.yml'], { from: 'user' });
        expect(updateStub.callCount).to.equal(1);
    });

    it('should reject with missing argument', function (): void {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['update', '-l', 'asdf'], { from: 'user' });
        }).to.throw(`required option '-c, --codecov <path>' not specified`);
        expect(updateStub.callCount).to.equal(0);
    });

    it('should reject unknown command', function (): void {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['cheese', '-l', 'asdf'], { from: 'user' });
        }).to.throw(`error: unknown command 'cheese'`);
        expect(updateStub.callCount).to.equal(0);
    });

    it('should output help', function (): void {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['--help'], { from: 'user' });
        }).to.throw(`(outputHelp)`);
    });
});
