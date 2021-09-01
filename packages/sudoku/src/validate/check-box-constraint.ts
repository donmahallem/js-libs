/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { checkConstraint } from './check-constraint';

export const checkBoxConstraint = (board: number[][], row: number, column: number, boardSize: number, boxSize: number): boolean => {
    const constraint: boolean[] = new Array<boolean>(boardSize).fill(false);
    const subsectionRowStart: number = Math.floor(row / boxSize) * boxSize;
    const subsectionRowEnd: number = subsectionRowStart + boxSize;

    const subsectionColumnStart: number = Math.floor(column / boxSize) * boxSize;
    const subsectionColumnEnd: number = subsectionColumnStart + boxSize;

    for (let r: number = subsectionRowStart; r < subsectionRowEnd; r++) {
        for (let c: number = subsectionColumnStart; c < subsectionColumnEnd; c++) {
            if (!checkConstraint(board, r, constraint, c)) return false;
        }
    }
    return true;
};
