import defaultRollup from '@donmahallem/rollup-config';
import pkg from './package.json';

const cliConfig = defaultRollup({ main: './dist/cli/cli.js' });//, { plugins: { commonjs: { esmExternals: true } } }
cliConfig.input = './src/cli.ts';
cliConfig.external = ["commander", "deepmerge", "yaml", "@lerna/project"];
export default [
    defaultRollup(pkg),
    cliConfig,
];
