/*
 * Package @donmahallem/remark-lerna-packages
 * Source https://donmahallem.github.io/js-libs/
 */

declare module '@lerna/package' {
    export class Package {
        public static lazy(opt: { description: string; homepage: string; name: string }): Package;

        public get(key: string): string | undefined | boolean;

        public version: string;
        public name: string;
    }
}

declare module '@lerna/project' {
    export function getPackages(path: string): Promise<import('@lerna/package').Package[]>;
}
