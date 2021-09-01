/*
 * Package @donmahallem/sudoku
 * Source https://donmahallem.github.io/js-libs/
 */

import { createEmptySudokuBoard } from '../create-empty-sudoku-board';
import { CoverBoard } from './cover-board';
import { ColumnNode, DancingNode } from './dancing-node';
export type ResultCallback = (board: number[][]) => boolean;
export class DLX {
    private header: ColumnNode;
    private answer: DancingNode[];
    private resultCallback: ResultCallback;
    private isDone = false;
    public constructor(cover: CoverBoard, public readonly boardSize: number) {
        this.header = this.createDLXList(cover);
    }

    private createDLXList(grid: CoverBoard): ColumnNode {
        const nbColumns: number = grid[0].length;
        let headerNode: ColumnNode = new ColumnNode('header');
        const columnNodes: ColumnNode[] = [];

        for (let i = 0; i < nbColumns; i++) {
            const n: ColumnNode = new ColumnNode(`${i}`);
            columnNodes.push(n);
            headerNode = headerNode.linkRight(n) as ColumnNode;
        }

        headerNode = headerNode.right.column;

        for (const aGrid of grid) {
            let prev: DancingNode | undefined = undefined;

            for (let j = 0; j < nbColumns; j++) {
                if (aGrid[j]) {
                    const col: ColumnNode = columnNodes[j];
                    const newNode: DancingNode = new DancingNode(col);

                    // tslint:disable-next-line:triple-equals
                    if (prev == undefined) {
                        prev = newNode;
                    }

                    col.top.linkDown(newNode);
                    prev = prev.linkRight(newNode);
                    col.size++;
                }
            }
        }

        headerNode.size = nbColumns;

        return headerNode;
    }

    private selectColumnNodeHeuristic(): ColumnNode {
        let min: number = Number.MAX_VALUE;
        // tslint:disable-next-line:no-unnecessary-initializer
        let ret: ColumnNode = this.header.right as ColumnNode;
        for (let c: ColumnNode = this.header.right as ColumnNode; c !== this.header; c = c.right as ColumnNode) {
            if (c.size < min) {
                min = c.size;
                ret = c;
            }
        }
        return ret;
    }

    public handleSolution(anser: DancingNode[]): void {
        const field: number[][] = this.parseSolution(anser);
        this.isDone = this.resultCallback(field);
    }
    private parseSolution(answer: DancingNode[]): number[][] {
        const result: number[][] = createEmptySudokuBoard(this.boardSize);
        for (const n of answer) {
            let rcNode: DancingNode = n;
            let min: number = parseInt(rcNode.column.name, 10);
            for (let tmp: DancingNode = n.right; tmp !== n; tmp = tmp.right) {
                const val: number = parseInt(tmp.column.name, 10);
                if (val < min) {
                    min = val;
                    rcNode = tmp;
                }
            }
            const ans1: number = parseInt(rcNode.column.name, 10);
            const ans2: number = parseInt(rcNode.right.column.name, 10);
            const r: number = Math.floor(ans1 / this.boardSize);
            const c: number = ans1 % this.boardSize;
            const num: number = (ans2 % this.boardSize) + 1;
            result[r][c] = num;
        }
        return result;
    }
    public search(k: number): void {
        if (this.isDone) {
            return;
        }
        if (this.header.right === this.header) {
            this.handleSolution(this.answer);
        } else {
            let c: ColumnNode = this.selectColumnNodeHeuristic();
            c.cover();

            for (let r: DancingNode = c.bottom; r !== c; r = r.bottom) {
                this.answer.push(r);

                for (let j: DancingNode = r.right; j !== r; j = j.right) {
                    j.column.cover();
                }

                this.search(k + 1);

                r = this.answer.splice(this.answer.length - 1, 1)[0];
                c = r.column;

                for (let j: DancingNode = r.left; j !== r; j = j.left) {
                    j.column.uncover();
                }
            }
            c.uncover();
        }
    }

    public runSolver(cb: ResultCallback): void | number[][] {
        this.answer = [];
        this.isDone = false;
        this.resultCallback = cb;
        this.search(0);
    }
}
