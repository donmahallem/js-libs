/*!
 * Source https://github.com/donmahallem/js-libs Package: label-gh
 */

import { calculateLabelDiff, syncLabels } from '@donmahallem/label-gh';
import { Octokit } from '@octokit/core';
import { PRLabel } from './github-types';
import { getPullRequestLabels } from './pull-request-labels';

export interface IOpts {
    /**
     * Issue or pull request number
     */
    pull_number: number;
    /**
     * Repository owner
     */
    owner: string;
    /**
     * Repository name
     */
    repo: string;
}
export const syncPackageLabels = async (octokit: Octokit,
    opts: IOpts,
    packageLabel: string[],
    prefix: string = 'pkg'): Promise<ResponseData> => {
    const expectedLabels: string[] = packageLabel.map((baseLabel: string): string => {
        return `${prefix}:${baseLabel}`;
    })
    const prLabels: PRLabel[] = await getPullRequestLabels(octokit, opts);
    const prLabelNames: (string | undefined)[] = prLabels.map((lab: PRLabel): string | undefined => {
        return lab.name;
    });
    const filteredPrLabels: string[] = prLabelNames.filter((label: string | undefined): boolean => {
        if (label) {
            return label.startsWith(`${prefix}:`);
        }
        return false;
    }) as string[];
    const diff: ILabelDiff = calculateLabelDiff(expectedLabels, filteredPrLabels);
    await syncLabels(octokit, opts, diff.)
};
