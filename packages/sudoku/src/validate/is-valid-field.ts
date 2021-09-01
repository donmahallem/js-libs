/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { isValid } from './is-valid';

/**
 * checks if a valid field is provided
 *
 * @param {number[][]} board the board
 * @param {number} boardSize boardsize along one side
 * @param {number} boxSize box size
 * @returns {boolean} True if the field is valid
 */
export const isValidField = (board: number[][], boardSize: number, boxSize: number): boolean => {
    for (let row = 0; row < boardSize; row++) {
        for (let column = 0; column < boardSize; column++) {
            if (!isValid(board, row, column, boardSize, boxSize)) {
                return false;
            }
        }
    }
    return true;
};
