


declare module '@lerna/package' {
    import { resolve } from "npm-package-arg";
    type ResolveResult = ReturnType<typeof resolve>;
    export type RawManifest = {
        name: string;
        version: string;
        private?: boolean;
        bin?: Record<string, string> | string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        optionalDependencies?: Record<string, string>;
        peerDependencies?: Record<string, string>;
        publishConfig?: Record<string, string>;
        workspaces?: string[] | { packages: string[] };
    } & { [key: string]: any; }
    /**
     * Lerna's internal representation of a local package, with
     * many values resolved directly from the original JSON.
     */
    export class Package {
        public static lazy(ref: string | Package | RawManifest, dir?: string): Package;
        public constructor(pkg: RawManifest, location: string, rootPath?: string);
        public get location(): string;
        public get private(): boolean;
        public get resolved(): ResolveResult;
        public get rootPath(): string;
        public get scripts(): RawManifest['scripts'];
        public get bin(): RawManifest['scripts'];
        public get binLocation(): string;
        public get manifestLocation(): string;
        public get nodeModuleLocation(): string;
        public get __isLernaPackage(): boolean;
        public get version(): string;
        public set version(v: string);
        public get contents(): string;
        public set contents(subDirectory: string);
        public get dependencies(): RawManifest['dependencies'];
        public get devDependencies(): RawManifest['devDependencies'];
        public get optionalDependencies(): RawManifest['optionalDependencies'];
        public get peerDependencies(): RawManifest['peerDependencies'];
        get<K extends (keyof RawManifest) | string>(key: K): RawManifest[K];
        set<K extends (keyof RawManifest) | string>(key: K, val: RawManifest[K]): void;
        /**
         * Provide shallow copy for munging elsewhere
         */
        public toJson(): Object;

        /**
         * Refresh internal state from disk (e.g., changed by external lifecycles)
         */
        public refresh(): Promise<Package>;
        /**
         * Write manifest changes to disk
         */
        public serialize(): Promise<void>;
        /**
         * Mutate local dependency spec according to type
         */
        public updateLocalDependency(resolved: ResolveResult, depVersion: string, savePrefix: string): void;
    }
}

declare module '@lerna/project' {
    import { Package } from "@lerna/package";

    export interface ProjectConfig {
        packages: string[];
        useWorkspaces: boolean;
        version: string;
    }
    /**
    * A representation of the entire project managed by Lerna.
    *
    * Wherever the lerna.json file is located, that is the project root.
    * All package globs are rooted from this location.
    */
    export class Project {
        /**
         * 
         * @param cwd {string} [cwd] defaults to process.cwd()
         */
        public static getPackges(cwd?: string): Promise<Package[]>;
        /**
         * 
         * @param cwd {string} [cwd] defaults to process.cwd()
         */
        public static getPackgesSync(cwd?: string): Package[];

        public constructor(cwd: string);
        public get version(): string;
        public set version(val: string);
        public get packageConfigs(): string[];
        public get packageParentDirs(): string[];
        public get manifest(): Package;
        public get licensePath(): string;
        public getPackages(): Promise<Package[]>;
        public getPackagesSync(): Package[];
        public getPackageLicensePaths(): string[];
        public isIndependent(): boolean;
        rootPath: string;
        rootConfigLocation: string;
        config: ProjectConfig;
    }
    export function getPackges(cwd?: string): Promise<Package[]>;
    export function getPackgesSync(cwd?: string): Package[];
}
