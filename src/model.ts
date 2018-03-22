import * as E from './enums';
import * as T from './types';

export default class Model {
    private STATE: T.GameStateGrid;
    private META: T.IGameStateMeta = {
        score: {
            [E.Turn.Player1]: 0,
            [E.Turn.Player2]: 0,
        },
        size: 3,
        status: E.Status.InProgress,
        turn: E.Turn.Player1,
    };

    constructor(config: T.IModelConfig) {
        this.META.size = config.size || this.META.size;
        this.STATE = this.getEmptyBoard();
    }

    public get state(): T.GameStateGrid {
        return this.STATE;
    }

    public get meta(): T.IGameStateMeta {
        return this.META;
    }

    public get status(): E.Status {
        return this.META.status;
    }

    public set status(status: E.Status) {
        this.META.status = status;
    }

    public get turn(): E.Turn {
        return this.META.turn;
    }

    public set turn(turn: E.Turn) {
        this.META.turn = turn;
    }

    public get boardSize(): number {
        return this.META.size;
    }

    public getScoreForPlayer(turn: E.Turn): number {
        return this.META.score[turn];
    }

    public resetScoreForPlayer(turn: E.Turn): void {
        this.setScoreForPlayer(turn, 0);
    }

    public incrementScoreForPlayer(turn: E.Turn): void {
        const currentScore: number = this.getScoreForPlayer(turn);
        this.setScoreForPlayer(turn, currentScore + 1);
    }

    public resetBoard(): void {
        this.STATE = this.getEmptyBoard();
    }

    public setStatus(status: E.Status): void {
        this.META.status = status;
    }

    private setScoreForPlayer(turn: E.Turn, newScore: number): void {
        this.META.score[turn] = newScore;
    }

    private getEmptyBoard(): T.GameStateGrid {
        const grid: T.GameStateGrid = [];

        for (let i = 0; i < this.meta.size; ++i) {
            const row: T.GameStateRow = [];

            for (let j = 0; j < this.meta.size; ++j) {
                row.push(E.Square.Empty);
            }

            grid.push(row);
        }

        return grid;
    }
}
