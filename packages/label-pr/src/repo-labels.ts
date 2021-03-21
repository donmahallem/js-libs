import { Octokit } from "@octokit/core"
import { GetRepoLabelsParameters, GithubLabel } from "./github-types";

export const getRepoLables = async (octokit: Octokit, params: GetRepoLabelsParameters): Promise<GithubLabel[]> => {
  const listFilesResponse = await octokit.request('GET /repos/{owner}/{repo}/labels', params)
  return listFilesResponse.data;
}
