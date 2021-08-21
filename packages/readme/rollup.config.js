import defaultRollup from '@donmahallem/rollup-config';
import pkg from './package.json';

const defaultConfig = defaultRollup(pkg);
export default Object.assign(defaultConfig, {
    input: {
        index: 'src/index.ts',
        cli: 'src/cli.ts',
    },
    output: defaultConfig
        .output
        .map((item) => {
            return Object.assign(item, {
                file: null,
                dir: './dist/esm',
            });
        }),
});
