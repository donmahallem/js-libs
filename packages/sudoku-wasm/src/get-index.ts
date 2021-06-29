/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */

export const getIndex: (row: number, column: number, num: number, boardSize: number) => number =
    (row: number, column: number, num: number, boardSize: number): number => {
        return (row - 1) * boardSize * boardSize + (column - 1) * boardSize + (num - 1);
    };
