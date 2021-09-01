/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { checkColumnConstraint } from './check-column-constraint';
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
describe('./backtrack/check-column-constraint.ts', (): void => {
    describe('checkColumnConstraint()', (): void => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((testRow: number): void => {
            const isValid: boolean = testRow !== 5;
            it(`should return ${isValid ? 'true' : 'false'} for row ${testRow}`, (): void => {
                expect(checkColumnConstraint(board, testRow, 9)).to.equal(isValid);
            });
        });
    });
});
