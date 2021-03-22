/*!
 * Source https://github.com/donmahallem/js-libs Package: label-gh
 */

import { Octokit } from '@octokit/core';
import { GithubLabel, PRLabelsParameter, PRLabelsResponse } from './github-types';

export const getPullRequestLabels = async (octokit: Octokit,
  params: PRLabelsParameter): Promise<Partial<GithubLabel>[]> => {
  const listFilesResponse: PRLabelsResponse = await octokit
    .request('GET /repos/{owner}/{repo}/pulls/{pull_number}', params);
  return listFilesResponse.data.labels || [];
};
