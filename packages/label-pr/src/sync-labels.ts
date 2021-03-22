/*!
 * Source https://github.com/donmahallem/js-libs Package: label-gh
 */

import { Octokit } from '@octokit/core';
import { addLabels } from './add-labels';
import { setLabels, ResponseData } from './set-labels';

export interface IOpts {
    /**
     * Issue or pull request number
     */
    issue_number: number;
    /**
     * Repository owner
     */
    owner: string;
    /**
     * Repository name
     */
    repo: string;
}
export const syncLabels = (octokit: Octokit,
    opts: IOpts,
    labels: string[],
    replace: boolean = true): Promise<ResponseData> => {
    if (replace) {
        return setLabels(octokit, {
            ...opts,
            labels,
        });
    } else {
        return addLabels(octokit, {
            ...opts,
            labels,
        });
    }
};
