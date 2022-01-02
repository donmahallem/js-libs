import { Project } from '@lerna/project';
import { promises as fsp } from 'fs';
import { parse, stringify } from 'yaml';
import { updateConfig } from './update-config';

export async function update(lernaRoot: string, codecovFile: string): Promise<void> {
    let codecovSourceFile: string;
    try { codecovSourceFile = await fsp.readFile(codecovFile, 'utf-8'); }
    catch (err: any) {
        codecovSourceFile = '';
    }
    const parsedCodecovSource: object = parse(codecovSourceFile);
    const updatedConfig: object = await updateConfig(new Project(lernaRoot), parsedCodecovSource);
    const outputCodecovConfig: string = stringify(updatedConfig);
    return await fsp.writeFile(codecovFile, outputCodecovConfig, 'utf-8');
}
