/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import { command } from './command';
command()
    .then((): void => {
        console.log('File converted');
    })
    .catch(console.error);
