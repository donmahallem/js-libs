/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { COVER_START_IDX } from '../constants';
import { CoverBoard } from './cover-board';
import { getIndex } from './get-index';

export const createCellConstraints = (matrix: CoverBoard, header: number, boardSize: number): number => {
    let headerIter: number = header;
    for (let row: number = COVER_START_IDX; row <= boardSize; row++) {
        for (let column: number = COVER_START_IDX; column <= boardSize; column++, headerIter++) {
            for (let n: number = COVER_START_IDX; n <= boardSize; n++) {
                const index: number = getIndex(row, column, n, boardSize);
                // console.log(index, _header, matrix.length);
                matrix[index][headerIter] = true;
            }
        }
    }

    return headerIter;
};
