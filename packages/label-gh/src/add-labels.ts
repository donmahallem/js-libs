/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { GithubLabel } from './github-types';

type PostLabelParameters = Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/labels']['parameters'];
type PostLabelResponse = Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/labels']['response'];
export const addLabels = async (octokit: Octokit, params: PostLabelParameters): Promise<GithubLabel[]> => {
    return octokit
        .request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', params)
        .then((resp: PostLabelResponse): GithubLabel[] => {
            return resp.data;
        });
};
