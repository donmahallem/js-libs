import { Octokit } from "@octokit/core"
import { Endpoints } from "@octokit/types";

type PostLabelParameters = Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/labels']['parameters'];
type PostLabelResponse = Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/labels']['response'];
export const addLabels = async (octokit: Octokit,
  params: PostLabelParameters): Promise<PostLabelResponse['data']> => {
  return await octokit
    .request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', params)
    .then((resp: PostLabelResponse): PostLabelResponse['data'] => {
      return resp.data;
    });
}
