import * as E from './enums';
import * as T from './types';
import View from './view';

import './styles/index.scss';

class GameState {
    private state: T.GameStateGrid = this.resetBoard();
    private meta: T.IGameStateMeta = {
        score: {
            player1: 0,
            player2: 0,
        },
        status: E.Status.InProgress,
        turn: E.Turn.Player1,
    };
    private view: View;

    private readonly stateRowSize = this.state.length;
    private readonly stateColSize = this.state[0].length;

    constructor($selectors: T.IGameStateIdSelectors) {
        this.view = new View({
            events: {
                clickSquare: this.onClickGridSquareHandler.bind(this),
                resetScore: this.onClickResetScoreHandler.bind(this),
                startNewGame: this.onClickNewGameHandler.bind(this),
            },
            selectors: $selectors,
        });
    }

    public rerender(): void {
        this.view.renderGame(this.state, this.meta);
    }

    private onClickNewGameHandler(e: Event): void {
        e.preventDefault();
        this.state = this.resetBoard();
        this.meta.status = E.Status.InProgress;
        this.rerender();
    }

    private onClickResetScoreHandler(e: Event): void {
        e.preventDefault();
        this.meta.score.player1 = 0;
        this.meta.score.player2 = 0;
        this.rerender();
    }

    private onClickGridSquareHandler(e: Event): void {
        if (this.meta.status !== E.Status.InProgress) {
            return;
        }

        const target: HTMLInputElement = e.target as HTMLInputElement;

        if (!target.matches('.js-board-square')) {
            return;
        }

        e.stopPropagation();
        const { turn } = this.meta;
        const row: number = parseInt(target.getAttribute('data-row') as string, 10);
        const col: number = parseInt(target.getAttribute('data-col') as string, 10);
        const currentSquare: E.Square = this.state[row][col];

        if (currentSquare !== E.Square.Empty) {
            return;
        }

        const newSquare: E.Square = turn === E.Turn.Player1
            ? E.Square.X
            : E.Square.O;
        this.state[row][col] = newSquare;

        if (this.checkWinningConditionsOfMove({ row, col }, newSquare)) {
            this.meta.status = E.Status.Victory;

            if (turn === E.Turn.Player1) {
                ++this.meta.score.player1;
            } else {
                ++this.meta.score.player2;
            }
        } else if (this.checkIfBoardIsFilled(this.state)) {
            this.meta.status = E.Status.Draw;
        } else {
            this.meta.turn = this.toggleTurn(this.meta.turn);
        }

        this.rerender();
    }

    private resetBoard(): T.GameStateGrid {
        return [
            [E.Square.Empty, E.Square.Empty, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.Empty],
        ];
    }

    private toggleTurn(turn: E.Turn): E.Turn {
        return turn === E.Turn.Player1
            ? E.Turn.Player2
            : E.Turn.Player1;
    }

    private moveIsWithinBoundaries({ row, col }: T.IPoint): boolean {
        return (
            row < this.stateRowSize && row >= 0 &&
            col < this.stateColSize && col >= 0
        );
    }

    private isMatchingPoint({ row, col }: T.IPoint, square: E.Square): boolean {
        return this.state[row][col] === square;
    }

    private columnHasWinningMoves(moves: T.IPoint[], square: E.Square): boolean {
        return (
            moves.length === this.state.length &&
            moves.every((point: T.IPoint) => this.isMatchingPoint(point, square))
        );
    }

    private checkWinningConditionsOfMove({ row, col }: T.IPoint, square: E.Square): boolean {
        const diagonalDownRightMoves: T.IPoint[] = [];
        for (let i = 0, j = col - row; this.moveIsWithinBoundaries({ row: i, col: j }); ++i, ++j) {
            diagonalDownRightMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(diagonalDownRightMoves, square)) {
            return true;
        }

        const diagonalDownLeftMoves: T.IPoint[] = [];
        for (let i = 0, j = col + row; this.moveIsWithinBoundaries({ row: i, col: j }); ++i, --j) {
            diagonalDownLeftMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(diagonalDownLeftMoves, square)) {
            return true;
        }

        const columnMoves: T.IPoint[] = [];
        for (let i = row, j = 0; this.moveIsWithinBoundaries({ row: i, col: j }); ++j) {
            columnMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(columnMoves, square)) {
            return true;
        }

        const rowMoves: T.IPoint[] = [];
        for (let i = 0, j = col; this.moveIsWithinBoundaries({ row: i, col: j }); ++i) {
            rowMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(rowMoves, square)) {
            return true;
        }

        return false;
    }

    private isSquareNotEmpty(square: E.Square) {
        return square !== E.Square.Empty;
    }

    private checkIfBoardIsFilled(grid: T.GameStateGrid): boolean {
        return grid.every((row) => row.every(this.isSquareNotEmpty));
    }
}

const $board: HTMLElement = document.getElementById('board')!;
const $toolbar: HTMLElement = document.getElementById('toolbar')!;
const gameState = new GameState({
    board: $board,
    toolbar: $toolbar,
});
gameState.rerender();
