import * as E from './enums';
import Model from './model';
import * as T from './types';
import View from './view';

import './styles/index.scss';

interface IControllerConfig {
    model: T.IModelConfig;
    selectors: T.IGameStateIdSelectors;
}

class GameState {
    private model: Model;
    private view: View;

    constructor(config: IControllerConfig) {
        this.model = new Model(config.model);
        this.view = new View({
            events: {
                clickSquare: this.onClickGridSquareHandler.bind(this),
                resetScore: this.onClickResetScoreHandler.bind(this),
                startNewGame: this.onClickNewGameHandler.bind(this),
            },
            selectors: config.selectors,
        });
    }

    public rerender(): void {
        this.view.renderGame(this.model.state, this.model.meta);
    }

    private onClickNewGameHandler(e: Event): void {
        e.preventDefault();
        this.model.resetBoard();
        this.model.setStatus(E.Status.InProgress);
        this.rerender();
    }

    private onClickResetScoreHandler(e: Event): void {
        e.preventDefault();
        this.model.resetScoreForPlayer(E.Turn.Player1);
        this.model.resetScoreForPlayer(E.Turn.Player2);
        this.rerender();
    }

    private onClickGridSquareHandler(e: Event): void {
        if (this.model.status !== E.Status.InProgress) {
            return;
        }

        const target: HTMLInputElement = e.target as HTMLInputElement;

        if (!target.matches('.js-board-square')) {
            return;
        }

        e.stopPropagation();
        const row: number = parseInt(target.getAttribute('data-row') as string, 10);
        const col: number = parseInt(target.getAttribute('data-col') as string, 10);
        const currentSquare: E.Square = this.model.state[row][col];

        if (currentSquare !== E.Square.Empty) {
            return;
        }

        const newSquare: E.Square = this.model.turn === E.Turn.Player1
            ? E.Square.X
            : E.Square.O;
        this.model.state[row][col] = newSquare;

        if (this.checkWinningConditionsOfMove({ row, col }, newSquare)) {
            this.model.status = E.Status.Victory;
            this.model.incrementScoreForPlayer(this.model.turn);
        } else if (this.checkIfBoardIsFilled(this.model.state)) {
            this.model.status = E.Status.Draw;
        } else {
            this.model.turn = this.toggleTurn(this.model.turn);
        }

        this.rerender();
    }

    private toggleTurn(turn: E.Turn): E.Turn {
        return turn === E.Turn.Player1
            ? E.Turn.Player2
            : E.Turn.Player1;
    }

    private moveIsWithinBoundaries({ row, col }: T.IPoint): boolean {
        return (
            row < this.model.boardSize && row >= 0 &&
            col < this.model.boardSize && col >= 0
        );
    }

    private isMatchingPoint({ row, col }: T.IPoint, square: E.Square): boolean {
        return this.model.state[row][col] === square;
    }

    private columnHasWinningMoves(moves: T.IPoint[], square: E.Square): boolean {
        return (
            moves.length === this.model.boardSize &&
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
    model: {
        size: 3,
    },
    selectors: {
        board: $board,
        toolbar: $toolbar,
    },
});
gameState.rerender();
