/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { Octokit } from '@octokit/core';
import { PRLabel, PRLabelsParameter, PRLabelsResponse } from './github-types';

export const getPullRequestLabels = async (octokit: Octokit,
  params: PRLabelsParameter): Promise<PRLabel[]> => {
  const listFilesResponse: PRLabelsResponse = await octokit
    .request('GET /repos/{owner}/{repo}/pulls/{pull_number}', params);
  return listFilesResponse.data.labels;
};
