/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { GithubLabel } from './../github-types';

type CreateRepoLabel = Endpoints['POST /repos/{owner}/{repo}/labels'];
type CreateRepoLabelParameteres = CreateRepoLabel['parameters'];
type CreateRepoLabelResponse = CreateRepoLabel['response'];
export const createLabel = async (octokit: Octokit, params: CreateRepoLabelParameteres): Promise<GithubLabel> => {
    return octokit
        .request('POST /repos/{owner}/{repo}/labels', params)
        .then((resp: CreateRepoLabelResponse): GithubLabel => {
            return resp.data;
        });
};
