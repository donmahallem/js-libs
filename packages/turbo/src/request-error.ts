/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

export class RequestError extends Error {
    /**
     *
     * @param message error message
     * @param status status code to be reported
     */
    constructor(message: string, public readonly status: number = 500) {
        super(message);
    }
}
