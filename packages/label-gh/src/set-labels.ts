/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { GithubLabel } from './github-types';

type PutLabelParameters = Endpoints['PUT /repos/{owner}/{repo}/issues/{issue_number}/labels']['parameters'];
type PutLabelResponse = Endpoints['PUT /repos/{owner}/{repo}/issues/{issue_number}/labels']['response'];
export const setLabels = async (octokit: Octokit,
    params: PutLabelParameters): Promise<GithubLabel[]> => octokit
    .request('PUT /repos/{owner}/{repo}/issues/{issue_number}/labels', params)
    .then((resp: PutLabelResponse): GithubLabel[] => resp.data);
