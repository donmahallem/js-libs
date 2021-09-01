/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { createEmptySudokuBoard } from '../create-empty-sudoku-board';
import { solve } from './solve';

describe('coverboard/solve.ts', (): void => {
    describe('solve()', (): void => {
        it('should solve empty field with boxSize 2', (): void => {
            expect(
                solve(
                    [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ],
                    4,
                    2
                )
            ).to.equal(true);
        });
        it('should solve non empty field with boxSize 2', (): void => {
            expect(
                solve(
                    [
                        [1, 2, 3, 4],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ],
                    4,
                    2
                )
            ).to.equal(true);
            expect(
                solve(
                    [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 3, 0],
                    ],
                    4,
                    2
                )
            ).to.equal(true);
        });
        it('should setup with a client instance as endpoint3', (): void => {
            expect(solve(createEmptySudokuBoard(4), 4, 2)).to.equal(true);
        });
        it('should setup with a client instance as endpoint4', (): void => {
            const test: number[][] = JSON.parse(JSON.stringify(createEmptySudokuBoard(4))) as number[][];
            expect(solve(test, 4, 2)).to.equal(true);
        });
        [2, 3, 4].forEach((testSize: number): void => {
            const boardSize: number = testSize ** 2;
            it(`should pass for boxSize ${testSize} and boardSize ${boardSize}`, (): void => {
                const testValue: number[][] = createEmptySudokuBoard(boardSize);
                expect(solve(testValue, boardSize, testSize)).to.equal(true);
            });
        });
    });
});
