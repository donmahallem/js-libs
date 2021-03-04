/**!
 * Source https://github.com/donmahallem/js-libs Package: rollup-config
 */

import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default (pkg: any): any => {
    const output: any[] = [];
    if (pkg.main) {
        output.push({
            file: pkg.main,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'cjs',
            preferConst: true,
            sourcemap: true,
        });
    }
    if (pkg.module) {
        output.push({
            file: pkg.module,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'esm',
            preferConst: true,
            sourcemap: true,
        });
    }
    return {
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            ...Object.keys(pkg.optionalDependencies || {}),
        ],
        input: 'src/index.ts',
        output,
        plugins: [
            nodeResolve(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            replace({
                __BUILD_DATE__: (): string => new Date().toString(),
                __BUILD_PACKAGE_NAME__: pkg.name,
                __BUILD_VERSION__: pkg.version,
                preventAssignment: true,
            }),
        ],
        preserveSymlinks: true,
    };
};
