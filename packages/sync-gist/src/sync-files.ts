/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import { calculateDiff } from './calculate-diff';
import { getGistFiles } from './get-gist-files';
import { loadFileContent } from './load-file-content';
import {
    InputFileContent,
    IConfig,
    IInputFile,
    IRequestMap,
    GistUpdateParamater,
    ISyncResult,
    GistUpdateResponse,
    SyncFile,
    SyncType,
    Changelog,
    GistGetResponseData,
    ChangelogItem
} from './types';

export const syncFiles = async (config: IConfig, octokit: Octokit): Promise<ISyncResult> => {
    const loadPromises: Promise<InputFileContent>[] = config.files
        .map((file: IInputFile): Promise<InputFileContent> => loadFileContent(file));
    const gistFiles: InputFileContent[] = await Promise.all(loadPromises);
    const currentGistState: GistGetResponseData = await getGistFiles(config.gist_id, octokit);
    const diff: Changelog = calculateDiff(currentGistState, gistFiles);
    const requestMap: IRequestMap = diff
        .reduce((prev: IRequestMap, cur: ChangelogItem): IRequestMap => {
            switch (cur.type) {
                case SyncType.CREATE:
                case SyncType.UPDATE:
                    prev[cur.data.filename] = cur.data;
                    break;
                case SyncType.DELETE:
                    if (config.prune === true) {
                        prev[cur.filename] = null;
                    }
                    break;
            }
            return prev;
        }, {});
    const params: GistUpdateParamater = {
        files: requestMap,
        gist_id: config.gist_id,
    };
    const response: GistUpdateResponse = await octokit.gists.update(params);
    return {
        files: gistFiles
            .map((inpFile: InputFileContent): SyncFile => {
                return {
                    filename: inpFile.filename,
                    source: inpFile.source,
                    size: inpFile.content.length,
                    type: SyncType.UPDATE,
                };
            }),
        response: response.data,
    };
};
