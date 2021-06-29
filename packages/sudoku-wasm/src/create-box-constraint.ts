/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { COVER_START_IDX } from './constants';
import { CoverBoard } from './cover-board';
import { getIndex } from './get-index';

export const createBoxConstraints = (matrix: CoverBoard, header: number, boardSize: number, boxSize: number): number => {
    let headerIter: number = header;
    for (let row: number = COVER_START_IDX; row <= boardSize; row += boxSize) {
        for (let column: number = COVER_START_IDX; column <= boardSize; column += boxSize) {
            for (let n: number = COVER_START_IDX; n <= boardSize; n++, headerIter++) {
                for (let rowDelta: number = 0; rowDelta < boxSize; rowDelta++) {
                    for (let columnDelta: number = 0; columnDelta < boxSize; columnDelta++) {
                        const index: number = getIndex(row + rowDelta, column + columnDelta, n, boardSize);
                        matrix[index][headerIter] = true;
                    }
                }
            }
        }
    }

    return headerIter;
};
