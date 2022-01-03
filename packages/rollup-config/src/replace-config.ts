/*
 * Package @donmahallem/rollup-config
 * Source https://donmahallem.github.io/js-libs/
 */

import replace from '@rollup/plugin-replace';
import { Plugin } from 'rollup';
import { IPartialPackage } from './partial-pkg';

/**
 * @param {IPartialConfig} pkg package.json to use
 */
export function setupReplacePlugin(pkg: IPartialPackage): Plugin {
    return replace({
        __BUILD_DATE__: (): string => new Date().toString(),
        __BUILD_PACKAGE_NAME__: pkg.name,
        __BUILD_VERSION__: pkg.version,
        preventAssignment: true,
    });
}
