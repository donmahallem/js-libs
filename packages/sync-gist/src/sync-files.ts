/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { loadFileContent } from './load-file-content';
import { InputFileContent, IConfig, IInputFile } from './types';

type GistUpdateParamater = Endpoints['PATCH /gists/{gist_id}']['parameters'];
type GistUpdateResponse = Endpoints['PATCH /gists/{gist_id}']['response'];
interface IRequestMap { [name: string]: InputFileContent; }
export const syncFiles = async (config: IConfig, octokit: Octokit): Promise<GistUpdateResponse> => {
    const loadPromises: Promise<InputFileContent>[] = config.files
        .map((file: IInputFile): Promise<InputFileContent> => loadFileContent(file));
    const gistFiles: InputFileContent[] = await Promise.all(loadPromises);
    const requestMap: IRequestMap = gistFiles
        .reduce((prev: IRequestMap, cur: InputFileContent): IRequestMap => {
            prev[cur.filename] = cur;
            return prev;
        }, {});
    const params: GistUpdateParamater = {
        files: requestMap,
        gist_id: config.gist_id,
    };
    return await octokit.request('PATCH /gists/{gist_id}', params);
};
