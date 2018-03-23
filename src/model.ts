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
        const clone: T.GameStateGrid = [];

        for (let i = 0; i < this.META.size; ++i) {
            clone.push([...this.STATE[i]]);
        }

        return clone;
    }

    public get meta(): T.IGameStateMeta {
        return {
            ...this.META,
            score: { ...this.META.score },
        };
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

    public get size(): number {
        return this.META.size;
    }

    public getSquare({ row, col }: T.IPoint): E.Square {
        return this.STATE[row][col];
    }

    public setSquare({ row, col }: T.IPoint, square: E.Square): void {
        this.STATE[row][col] = square;
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

    public toggleTurn(turn: E.Turn): void {
        const newTurn = turn === E.Turn.Player1
            ? E.Turn.Player2
            : E.Turn.Player1;
        this.META.turn = newTurn;
    }

    private setScoreForPlayer(turn: E.Turn, newScore: number): void {
        this.META.score[turn] = newScore;
    }

    private getEmptyBoard(): T.GameStateGrid {
        const grid: T.GameStateGrid = [];

        for (let i = 0; i < this.META.size; ++i) {
            const row: T.GameStateRow = [];

            for (let j = 0; j < this.META.size; ++j) {
                row.push(E.Square.Empty);
            }

            grid.push(row);
        }

        return grid;
    }
}
