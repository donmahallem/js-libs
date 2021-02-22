/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { BOARD_START_IDX } from '../constants';
import { checkConstraint } from './check-constraint';

export const checkColumnConstraint = (board: number[][], column: number, boardSize: number): boolean => {
    const constraint: boolean[] = new Array(boardSize).fill(false);
    for (let row: number = BOARD_START_IDX; row < boardSize; row++) {
        if (!checkConstraint(board, row, constraint, column)) {
            return false;
        }
    }
    return true;
};
