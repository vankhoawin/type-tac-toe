import * as E from './enums';
import Logic from './logic';
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
    private logic: Logic;

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
        this.logic = new Logic();
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

        if (this.logic.checkWinningConditionsOfMove(
            this.model.state,
            { row, col },
            newSquare,
            this.model.boardSize,
        )) {
            this.model.status = E.Status.Victory;
            this.model.incrementScoreForPlayer(this.model.turn);
        } else if (this.logic.checkIfBoardIsFilled(this.model.state)) {
            this.model.status = E.Status.Draw;
        } else {
            this.model.toggleTurn(this.model.turn);
        }

        this.rerender();
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
