import { default as cfg } from './../../rollup.base';

export default cfg.map((item) => {
    item.input = {
        cli: './src/cli.ts',
        index: './src/index.ts',
    };
    return item;
});
