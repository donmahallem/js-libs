/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Endpoints } from '@octokit/types';

export interface IInputFile {
    /**
     * optional name to be used for the file in gist.
     * Default: resolves filename from path
     */
    filename?: string;
    source: string;
}

export type FinalInputFile = Required<IInputFile>;
export type InputFileContent = FinalInputFile & { content: string };
export interface IConfig {
    readonly gist_id: string;
    readonly files: IInputFile[];
    /**
     * True if non touched files already in the gist should be deleted
     */
    readonly prune?: boolean;
}

export enum SyncType {
    UPDATE = 'update',
    CREATE = 'create',
    DELETE = 'delete'
}
export type SyncFile = FinalInputFile & {
    type: SyncType,
    size: number;
}
export type GistGetResponse = Endpoints['GET /gists/{gist_id}']['response'];
export type GistGetResponseData = GistGetResponse['data'];
export type GistUpdateParamater = Endpoints['PATCH /gists/{gist_id}']['parameters'];
export type GistUpdateResponse = Endpoints['PATCH /gists/{gist_id}']['response'];
export type GistUpdateResponseData = Endpoints['PATCH /gists/{gist_id}']['response']['data']
export interface IRequestMap { [name: string]: InputFileContent | null; }
export interface ISyncResult {
    files: SyncFile[],
    response: GistUpdateResponseData,
}

export interface IChangelogItem {
    type: SyncType,
}
export type DeleteChangelogItem = IChangelogItem & { filename: string, type: SyncType.DELETE };
export type UpdateChangelogItem = IChangelogItem & { data: InputFileContent, type: SyncType.CREATE | SyncType.UPDATE };
export type ChangelogItem = DeleteChangelogItem | UpdateChangelogItem;
export type Changelog = ChangelogItem[];
