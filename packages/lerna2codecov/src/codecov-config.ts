/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

export interface ICodecovProject {
    paths?: string[];
}
export type CodecovProjects = { [key: string]: ICodecovProject };
export interface ICodecovConfig {
    coverage?: {
        status?: {
            project?: CodecovProjects;
        };
    };
}
