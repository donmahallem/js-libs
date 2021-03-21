/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

type PutLabelParameters = Endpoints['PUT /repos/{owner}/{repo}/issues/{issue_number}/labels']['parameters'];
type PutLabelResponse = Endpoints['PUT /repos/{owner}/{repo}/issues/{issue_number}/labels']['response'];
export type ResponseData = PutLabelResponse['data'];
export const setLabels = async (octokit: Octokit,
  params: PutLabelParameters): Promise<ResponseData> => {
  return octokit
    .request('PUT /repos/{owner}/{repo}/issues/{issue_number}/labels', params)
    .then((resp: PutLabelResponse): ResponseData => {
      return resp.data;
    });
};
