const packageInfo = require('./package.json');
module.exports = {
    extends: ['@donmahallem/eslint-config'],
    rules: {
        'header/header': [
            2,
            'block',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ['', ` * Package ${packageInfo.name}`, ` * Source ${packageInfo.homepage}`, ' '],
            2,
        ],
    },
};
