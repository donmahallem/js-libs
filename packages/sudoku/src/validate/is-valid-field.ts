/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { isValid } from './is-valid';

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
