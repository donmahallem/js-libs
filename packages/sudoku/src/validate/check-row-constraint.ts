/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { BOARD_START_IDX } from '../constants';
import { checkConstraint } from './check-constraint';

export const checkRowConstraint = (board: number[][], row: number, boardSize: number): boolean => {
    const constraint: boolean[] = new Array(boardSize).fill(false);
    for (let column: number = BOARD_START_IDX; column < boardSize; column++) {
        if (!checkConstraint(board, row, constraint, column)) {
            return false;
        }
    }
    return true;
};
