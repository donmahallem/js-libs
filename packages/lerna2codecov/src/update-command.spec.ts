/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { expect } from 'chai';
import { Command } from 'commander';
import 'mocha';
import sinon from 'sinon';
import * as update from './update';
import { updateCommand } from './update-command';

/**
 *
 */
function setupTestCommand(): Command {
    const cmd: Command = updateCommand({ exitOverride: true });
    cmd.configureOutput({
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        writeErr: () => {},
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        writeOut: () => {},
    });
    return cmd;
}
/* eslint-disable @typescript-eslint/no-unused-expressions, no-unused-expressions */
describe('./update-command', (): void => {
    let sandbox: sinon.SinonSandbox;
    let updateStub: sinon.SinonStub<Parameters<typeof update['update']>, ReturnType<typeof update['update']>>;
    before('setup sandbox', (): void => {
        sandbox = sinon.createSandbox();
        updateStub = sandbox.stub(update, 'update');
    });
    afterEach('reset sandbox', (): void => {
        sandbox.reset();
    });
    after('restore sandbox', (): void => {
        sandbox.restore();
    });
    it('should output all lerna packages', async (): Promise<void> => {
        updateStub.resolves();
        await setupTestCommand().parseAsync(['update', '-l', './', '-c', './codecov.yml'], { from: 'user' });
        expect(updateStub.callCount).to.equal(1);
    });
    it('should reject with missing argument', (): void => {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['update', '-l', 'asdf'], { from: 'user' });
        }).to.throw(`required option '-c, --codecov <path>' not specified`);
        expect(updateStub.callCount).to.equal(0);
    });
    it('should reject unknown command', (): void => {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['cheese', '-l', 'asdf'], { from: 'user' });
        }).to.throw(`error: unknown command 'cheese'`);
        expect(updateStub.callCount).to.equal(0);
    });
    it('should output help', (): void => {
        const cmd: Command = setupTestCommand();
        expect(() => {
            cmd.parse(['--help'], { from: 'user' });
        }).to.throw(`(outputHelp)`);
    });
});
