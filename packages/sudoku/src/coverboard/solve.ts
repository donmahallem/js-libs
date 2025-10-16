/**
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { CoverBoard } from './cover-board.js';
import { DLX, ResultCallback } from './dlx.js';
import { initializeExactCoverBoard } from './initialize-cover-board.js';

export const solve = (board: number[][], boardSize: number, boxSize: number, cb: ResultCallback): void => {
    const cover: CoverBoard = initializeExactCoverBoard(board, boardSize, boxSize);
    const dlx: DLX = new DLX(cover, boardSize);
    dlx.runSolver(cb);
};

export const solveNum = (board: number[][], boardSize: number, boxSize: number, num: number): number[][][] => {
    const results: number[][][] = [];
    solve(board, boardSize, boxSize, (result: number[][]): boolean => {
        results.push(result);
        return results.length >= num;
    });
    return results;
};
