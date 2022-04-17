/*
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

export interface IInputFile {
    /**
     * optional name to be used for the file in gist.
     * Default: resolves filename from path
     */
    filename?: string;
    source: string;
}

export type FinalInputFile = Required<IInputFile>;
export type InputFileContent = FinalInputFile & { content: string };
export interface IConfig {
    readonly gist_id: string;
    readonly files: IInputFile[];
}
