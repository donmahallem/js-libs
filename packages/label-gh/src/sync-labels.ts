/*
 * Package root
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { addLabels } from './add-labels';
import { GithubLabel } from './github-types';
import { setLabels } from './set-labels';

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
