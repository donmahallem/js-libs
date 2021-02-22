/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { checkBoxConstraint } from './check-box-constraint';
import { checkColumnConstraint } from './check-column-constraint';
import { checkRowConstraint } from './check-row-constraint';

export const isValid = (board: number[][], row: number, column: number, boardSize: number, boxSize: number): boolean => {
    return checkRowConstraint(board, row, boardSize) &&
        checkColumnConstraint(board, column, boardSize) &&
        checkBoxConstraint(board, row, column, boardSize, boxSize);
};
