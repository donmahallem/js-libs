/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { calculateLabelDiff, getPullRequestLabels, syncLabels, GithubLabel, ILabelDiff } from '@donmahallem/label-gh';
import { Octokit } from '@octokit/core';

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
export const syncPRLabels = async (octokit: Octokit,
    opts: IOpts,
    packageLabel: string[],
    prefix: string = 'pkg'): Promise<GithubLabel[]> => {
    const expectedLabels: string[] = packageLabel.map((baseLabel: string): string => {
        return `${prefix}:${baseLabel}`;
    });
    const prLabels: Partial<GithubLabel>[] = await getPullRequestLabels(octokit, opts);
    const prLabelNames: string[] = prLabels.map((lab: GithubLabel): string | undefined => {
        return lab.name;
    }).filter((label: string | undefined): boolean => {
        // tslint:disable-next-line:triple-equals
        return label != undefined;
    }) as string[];
    const diff: ILabelDiff = calculateLabelDiff(expectedLabels, prLabelNames);
    const finalLabels: string[] = [];
    finalLabels.push(...diff.add);
    finalLabels.push(...diff.unchanged);
    finalLabels.push(...diff.remove
        .filter((label: string): boolean => {
            return !label.startsWith(`${prefix}:`);
        }));
    return syncLabels(octokit, {
        issue_number: opts.pull_number,
        owner: opts.owner,
        repo: opts.repo,
    }, finalLabels, true);
};
