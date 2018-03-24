import * as E from './enums';
import Logic from './logic';
import Model from './model';
import * as T from './types';
import View from './view';

export default class TypeTacToe {
    private model: Model;
    private view: View;
    private logic: Logic;

    constructor(config: T.ITypeTacToeConfig) {
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
        this.model.resetLastMove();
        this.model.setStatus(E.Status.InProgress);
        this.model.toggleTurn(this.model.turn);
        this.rerender();
    }

    private onClickResetScoreHandler(e: Event): void {
        this.model.resetScoreForPlayer(E.Turn.Player1);
        this.model.resetScoreForPlayer(E.Turn.Player2);
        this.onClickNewGameHandler(e);
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
        const point: T.IPoint = { row, col };
        const currentSquare: E.Square = this.model.getSquare(point);

        if (currentSquare !== E.Square.Empty) {
            return;
        }

        const newSquare: E.Square = this.model.turn === E.Turn.Player1
            ? E.Square.X
            : E.Square.O;
        this.model.setSquare(point, newSquare);

        if (this.logic.checkWinningConditionsOfMove(
            this.model.state,
            { row, col },
            newSquare,
            this.model.size,
        )) {
            this.model.setStatus(E.Status.Victory);
            this.model.incrementScoreForPlayer(this.model.turn);
        } else if (this.logic.checkIfBoardIsFilled(this.model.state)) {
            this.model.setStatus(E.Status.Draw);
        } else {
            this.model.toggleTurn(this.model.turn);
        }

        this.rerender();
    }
}
