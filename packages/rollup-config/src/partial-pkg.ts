/*
 * Package @donmahallem/rollup-config
 * Source https://donmahallem.github.io/js-libs/
 */

export interface IPartialPackage {
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    main?: string;
    module?: string;
    name?: string;
    optionalDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    types?: string;
    version?: string;
}
