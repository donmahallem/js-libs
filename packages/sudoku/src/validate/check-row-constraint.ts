/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { checkConstraint } from './check-constraint';
import { BOARD_START_IDX } from '../constants';

export const checkRowConstraint = (board: number[][], row: number, boardSize: number): boolean => {
    const constraint: boolean[] = new Array<boolean>(boardSize).fill(false);
    for (let column: number = BOARD_START_IDX; column < boardSize; column++) {
        if (!checkConstraint(board, row, constraint, column)) {
            return false;
        }
    }
    return true;
};
