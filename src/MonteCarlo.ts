import { checkNoMoreMoves, makeMove } from "./gameFunctions";

export class MonteCarlo {

}

class Node {

    move: number;
    state: number[][];
    player: number;
    parent: Node | null;
    children: Node[] = [];
    wins: number = 0;
    visits: number = 0;

    constructor(parent: Node, move: number, state: number[][], player: number) {
        this.parent = parent;
        this.move = move;
        this.state = state;
        this.player = player;
    }

    /**
     * Returns the leaf node that is to be expanded
     */
    selection = (): Node => {
        if (this.isLeaf()) {
            return this;
        }

        const UCT = (node: Node) => {
            return node.wins / node.visits + Math.sqrt(2) * Math.sqrt(Math.log(this.visits)/node.visits);
        }
        const compare = (a: Node, b: Node) => {
            return UCT(a) - UCT(b);
        }
        this.children.sort(compare);
        return this.children[0].selection();
    }

    expandNode = () => {
        if (!checkNoMoreMoves(this.state)) {
            for (var i = 0; i < 7; i++) {
                const gameState = makeMove(this.state, i, this.player);
                if (gameState !== null) {
                    this.children.push(new Node(this, i, gameState, this.player));
                }
            }
        }
    }

    update = (win: boolean) => {
        this.visits++;
        if (win) {
            this.wins++;
        }
    }

    isLeaf = () => {
        return this.children.length === 0;
    }

    isRoot = () => {
        return this.parent === null;
    }
}

export const makePCMove = () => {

}