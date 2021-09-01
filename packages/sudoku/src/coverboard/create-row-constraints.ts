/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { COVER_START_IDX } from '../constants';
import { CoverBoard } from './cover-board';
import { getIndex } from './get-index';

export const createRowConstraints = (coverBoard: CoverBoard, hBase: number, boardSize: number): number => {
    let headerIter: number = hBase;
    for (let row: number = COVER_START_IDX; row <= boardSize; row++) {
        for (let n: number = COVER_START_IDX; n <= boardSize; n++, headerIter++) {
            for (let column: number = COVER_START_IDX; column <= boardSize; column++) {
                const index: number = getIndex(row, column, n, boardSize);
                coverBoard[index][headerIter] = true;
            }
        }
    }
    return headerIter;
};
