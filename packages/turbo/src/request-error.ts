/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

/**
 * Error that should be compatible with express errors
 */
export class RequestError extends Error {
    /**
     *
     * @param message error message
     * @param status status code to be reported
     */
    constructor(
        message: string,
        public readonly status: number = 500
    ) {
        super(message);
        this.name = RequestError.name;
    }
}
