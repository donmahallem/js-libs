/*
 * Package @donmahallem/rollup-config
 * Source https://donmahallem.github.io/js-libs/
 */

import commonjs, { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import json, { RollupJsonOptions } from '@rollup/plugin-json';
import nodeResolve, { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions, OutputOptions, OutputPlugin } from 'rollup';
import { IPartialPackage } from './partial-pkg';
import { setupReplacePlugin } from './replace-config';

export interface IConfig {
    output?: {
        cjs?: boolean;
        esm?: boolean;
    };
    plugins?: {
        commonjs?: false | RollupCommonJSOptions;
        nodeResolve?: RollupNodeResolveOptions;
        json?: false | RollupJsonOptions;
    };
    /**
     * Path to the tsconfig path to use
     *
     * @default './tsconfig.json'
     */
    tsconfig?: string;
}
export const baseConfig = (pkg: IPartialPackage, cfg: IConfig = {}): RollupOptions => {
    const output: OutputOptions[] = [];
    if (pkg.main && cfg?.output?.cjs !== false) {
        output.push({
            file: pkg.main,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'cjs',
            preferConst: true,
            sourcemap: true,
        });
    }
    if (pkg.module && cfg?.output?.esm !== false) {
        output.push({
            file: pkg.module,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'esm',
            preferConst: true,
            sourcemap: true,
        });
    }
    const plugins: OutputPlugin[] = [
        nodeResolve(
            cfg.plugins?.nodeResolve || {
                preferBuiltins: true,
            }
        ),
        typescript({
            tsconfig: cfg.tsconfig || './tsconfig.json',
        }),
    ];
    if (cfg.plugins?.commonjs !== false) {
        plugins.push(commonjs(cfg.plugins?.commonjs));
    }
    if (cfg.plugins?.json !== false) {
        plugins.push(
            json(
                cfg.plugins?.json || {
                    compact: true,
                }
            )
        );
    }
    plugins.push(setupReplacePlugin(pkg));
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
