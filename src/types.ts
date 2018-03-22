import * as Enums from './enums';

export type CurrentStatus = Enums.Status.Draw | Enums.Status.Victory | Enums.Status.InProgress;
export type GameStateSquare = Enums.Square.Empty | Enums.Square.X | Enums.Square.O;
export type GameStateRow = [GameStateSquare, GameStateSquare, GameStateSquare];
export type GameStateGrid = [GameStateRow, GameStateRow, GameStateRow];

export interface IPoint {
    row: number;
    col: number;
}

export interface IGameStateIdSelectors {
    [key: string]: HTMLElement;
}

export interface IGameStateClassSelectors {
    squares?: HTMLCollectionOf<Element>;
}

export interface IGameStateMeta {
    status: CurrentStatus;
    turn: Enums.Turn;
    score: {
        player1: number,
        player2: number,
    };
}

export interface IGameEventHandlers {
    startNewGame: (e: Event) => void;
    resetScore: (e: Event) => void;
    clickSquare: (e: Event) => void;
}

export interface IView {
    selectors: IGameStateIdSelectors;
    events: IGameEventHandlers;
}
