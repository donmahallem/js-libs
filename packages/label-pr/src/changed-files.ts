/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

type PRListFilesParameter = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/files']['parameters'];
type PRListFilesResponse = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/files']['response'];
export const getChangedFiles = async (octokit: Octokit,
  params: PRListFilesParameter): Promise<string[]> => {
  const listFilesResponse: PRListFilesResponse = await octokit
    .request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', params);

  return listFilesResponse.data.map((f: PRListFilesResponse['data'][0]): string => f.filename);
};
