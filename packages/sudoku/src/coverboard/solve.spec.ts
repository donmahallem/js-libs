/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { expect } from 'chai';
import 'mocha';
import { createEmptySudokuBoard } from '../create-empty-sudoku-board';
import { isValidField } from '../validate';
import { solve } from './solve';

describe('coverboard/solve.ts', (): void => {
    describe('solve()', (): void => {
        it('should solve non empty field with boxSize 2', (done: Mocha.Done): void => {
            const testField: number[][] = [[1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            solve(testField, 4, 2, (board: number[][]): true => {
                expect(board.length).greaterThan(0);
                done();
                return true;
            });
        });
        [2, 3, 4, 5].forEach((testSize: number): void => {
            const boardSize: number = testSize ** 2;
            it(`should pass for boxSize ${testSize} and boardSize ${boardSize}`, (done: Mocha.Done): void => {
                const testField: number[][] = createEmptySudokuBoard(boardSize);
                solve(testField, boardSize, testSize, (board: number[][]): true => {
                    expect(board.length).greaterThan(0);
                    // tslint:disable-next-line:no-unused-expression
                    expect(isValidField(board, boardSize, testSize)).to.be.true;
                    done();
                    return true;
                });
            });
        });
    });
});
