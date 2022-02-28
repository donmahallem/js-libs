/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { EMPTY_CELL } from './constants';

export const createEmptySudokuBoard = (boardSize: u8): u8[][] => {
    return new Array(boardSize)
        .fill(0)
        .map((): u8[] => new Array<u8>(boardSize).fill(EMPTY_CELL));
};
