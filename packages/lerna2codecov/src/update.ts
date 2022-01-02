/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { Project } from '@lerna/project';
import { promises as fsp } from 'fs';
import { parse, stringify } from 'yaml';
import { updateConfig } from './update-config';
import { ICodecovConfig } from '.';

/**
 * @param {string} lernaRoot path to lerna project root
 * @param {string} codecovFile path to codecov file
 * @returns {Promise<void>} a Promise which resolves on success
 */
export async function update(lernaRoot: string, codecovFile: string): Promise<void> {
    let codecovSourceFile: string;
    try {
        codecovSourceFile = await fsp.readFile(codecovFile, 'utf-8');
    } catch (err: unknown) {
        codecovSourceFile = '';
    }
    const parsedCodecovSource: ICodecovConfig = parse(codecovSourceFile) as ICodecovConfig;
    const updatedConfig: ICodecovConfig = await updateConfig(new Project(lernaRoot), parsedCodecovSource);
    const outputCodecovConfig: string = stringify(updatedConfig);
    return await fsp.writeFile(codecovFile, outputCodecovConfig, 'utf-8');
}
