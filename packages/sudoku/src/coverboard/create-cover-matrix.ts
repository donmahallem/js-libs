/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { CoverBoard } from './cover-board.js';
import { createBoxConstraints } from './create-box-constraint.js';
import { createCellConstraints } from './create-cell-constraints.js';
import { createColumnConstraints } from './create-column-constraints.js';
import { createRowConstraints } from './create-row-constraints.js';
import { CONSTRAINTS } from '../constants.js';

export const createCoverMatrix = (boardSize: number, boxSize: number): CoverBoard => {
    const coverMatrix: CoverBoard = new Array<boolean[]>(boardSize * boardSize * boardSize)
        .fill([])
        .map((): boolean[] => new Array<boolean>(boardSize * boardSize * CONSTRAINTS).fill(false));

    let header = 0;
    header = createCellConstraints(coverMatrix, header, boardSize);
    header = createRowConstraints(coverMatrix, header, boardSize);
    header = createColumnConstraints(coverMatrix, header, boardSize);
    createBoxConstraints(coverMatrix, header, boardSize, boxSize);

    return coverMatrix;
};
