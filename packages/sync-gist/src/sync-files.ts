import fs from 'fs'
import { Endpoints } from '@octokit/types'
import { IConfig, InputFile, InputFileContent } from './types'
import { Octokit } from '@octokit/core';
import { loadFileContent } from './load-file-content';

type GistUpdateParamater = Endpoints["PATCH /gists/{gist_id}"]["parameters"];
type GistUpdateResponse = Endpoints["PATCH /gists/{gist_id}"]["response"];
type RequestMap = { [name: string]: InputFileContent };
export const syncFiles = async (config: IConfig, octokit: Octokit): Promise<void> => {
    const loadPromises: Promise<InputFileContent>[] = config.files.map((file: InputFile): Promise<InputFileContent> => loadFileContent(file));
    const gistFiles: InputFileContent[] = await Promise.all(loadPromises);
    const requestMap: RequestMap = gistFiles
        .reduce((prev: RequestMap, cur: InputFileContent): RequestMap => {
            prev[cur.filename] = cur;
            return prev;
        }, {})
    const params: GistUpdateParamater = {
        files: requestMap,
        gist_id: config.gist_id,
    }
    const response: GistUpdateResponse = await octokit.gists.update(params)

}
