/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

export class RequestError extends Error {
    constructor(message: string, public readonly code: number = 500) {
        super(message);
    }
}
