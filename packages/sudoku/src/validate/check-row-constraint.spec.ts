/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { checkRowConstraint } from './check-row-constraint';
const board: number[][] = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 3, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 7, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
];
describe('./backtrack/check-row-constraint.ts', (): void => {
    describe('checkRowConstraint()', (): void => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((testRow: number): void => {
            const isValid: boolean = testRow !== 1;
            it(`should return ${isValid ? 'true' : 'false'} for row ${testRow}`, (): void => {
                expect(checkRowConstraint(board, testRow, 9)).to.equal(isValid);
            });
        });
    });
});
