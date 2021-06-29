/**!
 * Source https://github.com/donmahallem/js-libs Package: sudoku
 */
// tslint:disable:max-classes-per-file

export class DancingNode {
    public left: DancingNode;
    public right: DancingNode;
    public top: DancingNode;
    public bottom: DancingNode;
    public column: ColumnNode;

    public constructor(columnNode?: ColumnNode) {
        this.left = this;
        this.right = this;
        this.top = this;
        this.bottom = this;
        this.column = columnNode as any;
    }

    public linkDown(node: DancingNode): DancingNode {
        node.bottom = this.bottom;
        node.bottom.top = node;
        node.top = this;
        this.bottom = node;
        return node;
    }

    public linkRight(node: DancingNode): DancingNode {
        node.right = this.right;
        node.right.left = node;
        node.left = this;
        this.right = node;
        return node;
    }

    public removeLeftRight(): void {
        this.left.right = this.right;
        this.right.left = this.left;
    }

    public reinsertLeftRight(): void {
        this.left.right = this;
        this.right.left = this;
    }

    public removeTopBottom(): void {
        this.top.bottom = this.bottom;
        this.bottom.top = this.top;
    }

    public reinsertTopBottom(): void {
        this.top.bottom = this;
        this.bottom.top = this;
    }
}

export class ColumnNode extends DancingNode {

    public size: number;

    public constructor(public name: string) {
        super();
        this.size = 0;
        this.column = this;
    }

    public cover(): void {
        this.removeLeftRight();

        for (let i: DancingNode = this.bottom; i !== this; i = i.bottom) {
            for (let j: DancingNode = i.right; j !== i; j = j.right) {
                j.removeTopBottom();
                j.column.size--;
            }
        }
    }

    public uncover(): void {
        for (let i: DancingNode = this.top; i !== this; i = i.top) {
            for (let j: DancingNode = i.left; j !== i; j = j.left) {
                j.column.size++;
                j.reinsertTopBottom();
            }
        }
        this.reinsertLeftRight();
    }
}
