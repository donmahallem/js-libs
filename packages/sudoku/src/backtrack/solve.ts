/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { BOARD_START_IDX, CELL_VALUE_MIN, EMPTY_CELL } from '../constants';
import { isValid } from '../validate';

export const solve = (board: number[][], boardSize: number, boxSize: number): boolean => {
    for (let row: number = BOARD_START_IDX; row < boardSize; row++) {
        for (let column: number = BOARD_START_IDX; column < boardSize; column++) {
            if (board[row][column] === EMPTY_CELL) {
                for (let k: number = CELL_VALUE_MIN; k <= boardSize; k++) {
                    board[row][column] = k;
                    if (isValid(board, row, column, boardSize, boxSize) && solve(board, boardSize, boxSize)) {
                        return true;
                    }
                    board[row][column] = EMPTY_CELL;
                }
                return false;
            }
        }
    }
    return true;
};
