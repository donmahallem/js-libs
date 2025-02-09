/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { solve } from './solve';
import { createEmptySudokuBoard } from '../create-empty-sudoku-board';
import { isValidField } from '../validate';

describe('coverboard/solve.ts', function (): void {
    describe('solve()', function (): void {
        it('should solve non empty field with boxSize 2', function (done: Mocha.Done): void {
            const testField: number[][] = [
                [1, 2, 3, 4],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
            solve(testField, 4, 2, (board: number[][]): true => {
                expect(board.length).greaterThan(0);
                done();
                return true;
            });
        }).timeout(20000);
        // eslint-disable-next-line mocha/no-setup-in-describe
        [2, 3, 4, 5].forEach((testSize: number): void => {
            const boardSize: number = testSize ** 2;
            it(`should pass for boxSize ${testSize} and boardSize ${boardSize}`, function (done: Mocha.Done): void {
                const testField: number[][] = createEmptySudokuBoard(boardSize);
                solve(testField, boardSize, testSize, (board: number[][]): true => {
                    expect(board.length).greaterThan(0);

                    expect(isValidField(board, boardSize, testSize)).to.be.true;
                    done();
                    return true;
                });
            }).timeout(20000);
        });
    });
});
