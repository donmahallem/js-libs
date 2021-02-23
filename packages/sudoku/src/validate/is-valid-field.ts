/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { isValid } from './is-valid';

/**
 * checks if a valid field is provided
 * @param board the board
 * @param boardSize boardsize along one side
 * @param boxSize box size
 */
export const isValidField = (board: number[][], boardSize: number, boxSize: number): boolean => {
    for (let row: number = 0; row < boardSize; row++) {
        for (let column: number = 0; column < boardSize; column++) {
            if (!isValid(board, row, column, boardSize, boxSize)) {
                return false;
            }
        }
    }
    return true;
};
