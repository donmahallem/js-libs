/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { createSudokuBoard } from './create-sudoku-board';

describe('create-sudoku-board.ts', function (): void {
    describe('createSudokuBoard()', function (): void {
        it('should solve non empty field with boxSize 2', function (): void {
            const testField: number[][] = createSudokuBoard(9, 0.5);
            const numFilledCells: number = testField.reduce((prev: number, cur: number[]): number => {
                return (
                    prev +
                    cur.reduce((prev2: number, cur2: number): number => {
                        return prev2 + (cur2 > 0 ? 1 : 0);
                    }, 0)
                );
            }, 0);
            expect(numFilledCells).to.equal(Math.floor(9 ** 2 * 0.5));
        });
    });
});
