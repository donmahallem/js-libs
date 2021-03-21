/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import { addLabels } from './add-labels';
import { ResponseData, setLabels } from './set-labels';

export interface IOpts {
    /**
     * Issue or pull request number
     */
    issue_number: number,
    /**
     * Repository owner
     */
    owner: string,
    /**
     * Repository name
     */
    repo: string,
}
export const syncPrLabels = async (octokit: Octokit,
    opts: IOpts,
    labels: string[],
    replace: boolean = true): Promise<ResponseData> => {
    if (replace) {
        return setLabels(octokit, {
            ...opts,
            labels: labels,
        });
    } else {
        return addLabels(octokit, {
            ...opts,
            labels: labels,
        });
    }
};
