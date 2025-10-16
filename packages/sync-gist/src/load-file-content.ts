/**
 * Package @donmahallem/sync-gist
 * Source https://donmahallem.github.io/js-libs/
 */

import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { InputFileContent, IInputFile } from './types.js';

export const loadFileContent: (file: IInputFile, cwd?: string) => Promise<InputFileContent> = async (
    file: IInputFile,
    cwd?: string
): Promise<InputFileContent> => {
    const resolvedFilePath: string = cwd ? resolve(cwd, file.source) : resolve(file.source);
    const fileContent: string = await readFile(resolvedFilePath, 'utf-8');
    const filename: string = basename(file.filename ? file.filename : file.source);
    return {
        content: fileContent,
        filename,
        source: resolvedFilePath,
    };
};
