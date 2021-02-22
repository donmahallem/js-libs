
/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { COVER_START_IDX } from '../constants';
import { CoverBoard } from './cover-board';
import { getIndex } from './get-index';
export const createColumnConstraints = (matrix: CoverBoard, header: number, boardSize: number): number => {
    let iterHeader: number = header;
    for (let column: number = COVER_START_IDX; column <= boardSize; column++) {
        for (let n: number = COVER_START_IDX; n <= boardSize; n++, iterHeader++) {
            for (let row: number = COVER_START_IDX; row <= boardSize; row++) {
                const index: number = getIndex(row, column, n, boardSize);
                matrix[index][iterHeader] = true;
            }
        }
    }

    return iterHeader;
};
