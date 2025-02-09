/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { checkBoxConstraint } from './check-box-constraint';
const board: number[][] = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 3, 6, 0, 0, 3, 0, 0],
    [0, 7, 1, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 7, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 6],
];
describe('./backtrack/check-box-constraint.ts', function (): void {
    describe('checkBoxConstraint()', function (): void {
        // eslint-disable-next-line mocha/no-setup-in-describe
        [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((testRow: number): void => {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((testColumn: number): void => {
                const isValid = !((testRow >= 6 && testColumn >= 6) || (testRow < 3 && testColumn < 3));
                it(`should return ${isValid ? 'true' : 'false'} for (${testRow},${testColumn})`, function (): void {
                    expect(checkBoxConstraint(board, testRow, testColumn, 9, 3)).to.equal(isValid);
                });
            });
        });
    });
});
