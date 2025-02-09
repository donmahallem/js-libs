/**
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { Octokit } from '@octokit/core';
import { addLabels } from './add-labels.js';
import { GithubLabel } from './github-types.js';
import { setLabels } from './set-labels.js';

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
export const syncLabels = (octokit: Octokit, opts: IOpts, labels: string[], replace = true): Promise<GithubLabel[]> => {
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
