/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

/**
 * Error Object to provide
 */
export interface IErrorResponse {
    error: true;
    /**
     * Http Status Code
     */
    statusCode: number;
}
