/**!
 * Source https://github.com/donmahallem/js-libs Package: rollup-config
 */

import commonjs, { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import json, { RollupJsonOptions } from '@rollup/plugin-json';
import nodeResolve, { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export interface IConfig {
    output?: {
        cjs?: boolean,
        esm?: boolean,
    };
    plugins?: {
        commonjs?: false | RollupCommonJSOptions,
        nodeResolve?: RollupNodeResolveOptions,
        json?: false | RollupJsonOptions,
    };
}
export interface IPartialPackage {
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    main?: string;
    module?: string;
    name?: string;
    optionalDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    version?: string;
}
export default (pkg: IPartialPackage, cfg: IConfig = {}): any => {
    const output: any[] = [];
    if (pkg.main && (cfg?.output?.cjs) !== false) {
        output.push({
            file: pkg.main,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'cjs',
            preferConst: true,
            sourcemap: true,
        });
    }
    if (pkg.module && (cfg?.output?.esm) !== false) {
        output.push({
            file: pkg.module,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'esm',
            preferConst: true,
            sourcemap: true,
        });
    }
    const plugins: any[] = [
        nodeResolve(cfg.plugins?.nodeResolve || {
            preferBuiltins: true,
        }),
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ];
    if (cfg.plugins?.commonjs !== false) {
        plugins.push(commonjs(cfg.plugins?.commonjs));
    }
    if (cfg.plugins?.json !== false) {
        plugins.push(json(cfg.plugins?.json || {
            compact: true,
        }));
    }
    plugins.push(replace({
        __BUILD_DATE__: (): string => new Date().toString(),
        __BUILD_PACKAGE_NAME__: pkg.name,
        __BUILD_VERSION__: pkg.version,
        preventAssignment: true,
    }));
    return {
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            ...Object.keys(pkg.optionalDependencies || {}),
        ],
        input: 'src/index.ts',
        output,
        plugins,
        preserveSymlinks: true,
    };
};
