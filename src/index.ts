import View from './view';
import * as Types from './types';
import * as Enums from './enums';

import './styles/index.scss'; 

class GameState {
    private state: Types.GameStateGrid = this.resetBoard();
    private meta: Types.GameStateMeta = {
        status: Enums.Status.InProgress,
        turn: Enums.Turn.Player1,
        score: {
            player1: 0,
            player2: 0,
        },
    };
    private view: View

    readonly stateRowSize = this.state.length;
    readonly stateColSize = this.state[0].length;

    constructor($selectors: Types.GameStateIdSelectors) {
        this.view = new View({
            selectors: $selectors,
            events: {
                startNewGame: this.onClickNewGameHandler.bind(this),
                resetScore: this.onClickResetScoreHandler.bind(this),
                clickSquare: this.onClickGridSquareHandler.bind(this),
            },
        });
    }

    public rerender(): void {
        this.view.renderGame(this.state, this.meta);
    }

    private onClickNewGameHandler(e: Event): void {
        e.preventDefault();
        this.state = this.resetBoard();
        this.meta.status = Enums.Status.InProgress;
        this.rerender();
    }

    private onClickResetScoreHandler(e: Event): void {
        e.preventDefault();
        this.meta.score.player1 = 0;
        this.meta.score.player2 = 0;
        this.rerender();
    }

    private onClickGridSquareHandler(e: Event): void {
        if (this.meta.status === Enums.Status.Finished) {
            return;
        }

        const target: HTMLInputElement = <HTMLInputElement>e.target;

        if (!target.matches('.js-board-square')) {
            return;
        }

        e.stopPropagation();
        const { turn } = this.meta;
        const row: number = parseInt(<string>target.getAttribute('data-row'), 10);
        const col: number = parseInt(<string>target.getAttribute('data-col'), 10);
        const currentSquare: Enums.Square = this.state[row][col];

        if (currentSquare !== Enums.Square.Empty) {
            return;
        }

        const newSquare: Enums.Square = turn === Enums.Turn.Player1
            ? Enums.Square.X
            : Enums.Square.O;
        this.state[row][col] = newSquare;

        if (this.checkWinningConditionsOfMove({ row, col }, newSquare)) {
            this.meta.status = Enums.Status.Finished;

            if (turn === Enums.Turn.Player1) {
                ++this.meta.score.player1;
            } else {
                ++this.meta.score.player2;
            }
        } else {
            this.meta.turn = this.toggleTurn(this.meta.turn);
        }

        this.rerender();
    }

    private resetBoard(): Types.GameStateGrid {
        return [
            [Enums.Square.Empty, Enums.Square.Empty, Enums.Square.Empty],
            [Enums.Square.Empty, Enums.Square.Empty, Enums.Square.Empty],
            [Enums.Square.Empty, Enums.Square.Empty, Enums.Square.Empty],
        ];
    }

    private toggleTurn(turn: Enums.Turn): Enums.Turn {
        return turn === Enums.Turn.Player1
            ? Enums.Turn.Player2
            : Enums.Turn.Player1;
    }

    private moveIsWithinBoundaries({ row, col }: Types.Point): boolean {
        return (
            row < this.stateRowSize && row >= 0 &&
            col < this.stateColSize && col >= 0
        );
    }

    private isMatchingPoint({ row, col }: Types.Point, square: Enums.Square): boolean {
        return this.state[row][col] === square;
    }

    private columnHasWinningMoves(moves: Types.Point[], square: Enums.Square): boolean {
        return (
            moves.length === this.state.length &&
            moves.every((point: Types.Point) => this.isMatchingPoint(point, square))
        );
    }

    private checkWinningConditionsOfMove({ row, col }: Types.Point, square: Enums.Square): boolean {
        const diagonalDownRightMoves: Types.Point[] = [];
        for (let i = 0, j = col - row; this.moveIsWithinBoundaries({ row: i, col: j }); ++i, ++j) {
            diagonalDownRightMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(diagonalDownRightMoves, square)) {
            return true;
        }

        const diagonalDownLeftMoves: Types.Point[] = [];
        for (let i = 0, j = col + row; this.moveIsWithinBoundaries({ row: i, col: j }); ++i, --j) {
            diagonalDownLeftMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(diagonalDownLeftMoves, square)) {
            return true;
        }

        const columnMoves: Types.Point[] = [];
        for (let i = row, j = 0; this.moveIsWithinBoundaries({ row: i, col: j }); ++j) {
            columnMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(columnMoves, square)) {
            return true;
        }

        const rowMoves: Types.Point[] = [];
        for (let i = 0, j = col; this.moveIsWithinBoundaries({ row: i, col: j }); ++i) {
            rowMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(rowMoves, square)) {
            return true;
        }

        return false;
    }
}

const $board: HTMLElement = document.getElementById('board')!;
const $toolbar: HTMLElement = document.getElementById('toolbar')!;
const gameState = new GameState({
    board: $board,
    toolbar: $toolbar,
});
gameState.rerender();
