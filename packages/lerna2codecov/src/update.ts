/**
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { Project } from '@lerna/project';
import { readFile, writeFile } from 'node:fs/promises';
import { parse, stringify } from 'yaml';
import { ICodecovConfig } from './codecov-config.js';
import { updateConfig } from './update-config.js';

/**
 * @param {string} lernaRoot path to lerna project root
 * @param {string} codecovFile path to codecov file
 * @returns {Promise<void>} a Promise which resolves on success
 */
export async function update(lernaRoot: string, codecovFile: string): Promise<void> {
    let codecovSourceFile: string;
    try {
        codecovSourceFile = await readFile(codecovFile, 'utf-8');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
        codecovSourceFile = '';
    }
    const parsedCodecovSource: ICodecovConfig = parse(codecovSourceFile) as ICodecovConfig;
    const updatedConfig: ICodecovConfig = await updateConfig(new Project(lernaRoot), parsedCodecovSource);
    const outputCodecovConfig: string = stringify(updatedConfig);
    return await writeFile(codecovFile, outputCodecovConfig, 'utf-8');
}
