/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

export const getIndex: (row: number, column: number, num: number, boardSize: number) => number = (
    row: number,
    column: number,
    num: number,
    boardSize: number
): number => {
    return (row - 1) * boardSize * boardSize + (column - 1) * boardSize + (num - 1);
};
