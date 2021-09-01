/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { CELL_VALUE_MIN, COVER_START_IDX, EMPTY_CELL } from '../constants';
import { CoverBoard } from './cover-board';
import { createCoverMatrix } from './create-cover-matrix';
import { getIndex } from './get-index';

export const initializeExactCoverBoard = (board: number[][], boardSize: number, boxSize: number): CoverBoard => {
    const coverBoard: CoverBoard = createCoverMatrix(boardSize, boxSize);
    for (let row: number = COVER_START_IDX; row <= boardSize; row++) {
        for (let column: number = COVER_START_IDX; column <= boardSize; column++) {
            const n: number = board[row - 1][column - 1];
            if (n !== EMPTY_CELL) {
                for (let num: number = CELL_VALUE_MIN; num <= boardSize; num++) {
                    if (num !== n) {
                        coverBoard[getIndex(row, column, num, boardSize)].fill(false);
                    }
                }
            }
        }
    }
    return coverBoard;
};
