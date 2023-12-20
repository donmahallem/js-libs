/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { checkConstraint } from './check-constraint';
import { BOARD_START_IDX } from '../constants';

export const checkColumnConstraint = (board: number[][], column: number, boardSize: number): boolean => {
    const constraint: boolean[] = new Array<boolean>(boardSize).fill(false);
    for (let row: number = BOARD_START_IDX; row < boardSize; row++) {
        if (!checkConstraint(board, row, constraint, column)) {
            return false;
        }
    }
    return true;
};
