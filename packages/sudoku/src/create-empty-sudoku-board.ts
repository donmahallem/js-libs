/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { EMPTY_CELL } from './constants';

export const createEmptySudokuBoard = (boardSize: number): number[][] => {
    return new Array(boardSize).fill(0).map((): number[] => new Array<number>(boardSize).fill(EMPTY_CELL));
};
