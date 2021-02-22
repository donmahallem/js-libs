/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

import { knuthSolveNum } from './coverboard';
import { createEmptySudokuBoard } from './create-empty-sudoku-board';
const indexMap: { [key: number]: number[] } = {};

const getIndexMap = (boardSize: number): number[] => {
    if (!(boardSize in indexMap)) {
        indexMap[boardSize] = new Array(boardSize ** 2).fill(0).map((val: number, idx: number): number => idx);
    }
    return indexMap[boardSize];
};

export const createSudokuBoard = (boardSize: number, retainPercentage: number): number[][] => {
    const board: number[][] = createEmptySudokuBoard(boardSize);
    const boxSize: number = Math.sqrt(boardSize);
    const randomNumbers: number[] = new Array(boardSize).fill(0).map((val: any, idx: number): number => idx + 1)
        .sort((): number => Math.random() - 0.5);
    for (let i: number = 0; i < boardSize; i++) {
        board[i][Math.floor(Math.random() * boardSize)] = randomNumbers[i];
    }
    const selectBoard: number[][] = knuthSolveNum(board, boardSize, boxSize, 1)[0];
    const removeIndexes: number[] = getIndexMap(boardSize)
        .sort((): number => Math.random() - 0.5);
    for (let i: number = 0; i <= Math.floor(removeIndexes.length * retainPercentage); i++) {
        const removeX: number = removeIndexes[i] % boardSize;
        const removeY: number = Math.floor(removeIndexes[i] / boardSize);
        selectBoard[removeX][removeY] = 0;
    }
    return selectBoard;
};
