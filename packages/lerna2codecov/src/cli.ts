/**
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { updateCommand } from './update-command.js';

void updateCommand().parseAsync(process.argv);
