
export interface ICodecovProject {
    paths?: string[];
}
export type CodecovProjects = { [key: string]: ICodecovProject };
export interface ICodecovConfig {
    coverage?: {
        status?: {
            project?: CodecovProjects;
        }
    }
}
