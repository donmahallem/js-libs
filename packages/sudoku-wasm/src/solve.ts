/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { CoverBoard } from './cover-board';
import { DLX, ResultCallback } from './dlx';
import { initializeExactCoverBoard } from './initialize-cover-board';

export const solve = (board: u8[][], boardSize: u8, boxSize: u8, cb: ResultCallback): void => {
    const cover: CoverBoard = initializeExactCoverBoard(board, boardSize, boxSize);
    const dlx: DLX = new DLX(cover, boardSize);
    dlx.runSolver(cb);
};

export const solveNum = (board: u8[][], boardSize: u8, boxSize: u8, num: u8): u8[][][] => {
    const results: u8[][][] = [];
    solve(board, boardSize, boxSize, (result: u8[][]): boolean => {
        results.push(result);
        return results.length >= num;
    });
    return results;
};
