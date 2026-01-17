/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { checkBoxConstraint } from './check-box-constraint.js';
import { checkColumnConstraint } from './check-column-constraint.js';
import { checkRowConstraint } from './check-row-constraint.js';

export const isValid = (board: number[][], row: number, column: number, boardSize: number, boxSize: number): boolean => {
    return (
        checkRowConstraint(board, row, boardSize) &&
        checkColumnConstraint(board, column, boardSize) &&
        checkBoxConstraint(board, row, column, boardSize, boxSize)
    );
};
