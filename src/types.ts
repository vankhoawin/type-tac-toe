import * as E from './enums';

export type CurrentStatus = E.Status.Draw | E.Status.Victory | E.Status.InProgress;
export type GameStateSquare = E.Square.Empty | E.Square.X | E.Square.O;
export type GameStateRow = GameStateSquare[];
export type GameStateGrid = GameStateRow[];

export interface IPoint {
    row: number;
    col: number;
}

export interface IModelConfig {
    size: number;
}

export interface IGameStateIdSelectors {
    [key: string]: HTMLElement;
}

export interface IGameStateClassSelectors {
    squares?: HTMLCollectionOf<Element>;
}

export interface IGameStateMeta {
    status: CurrentStatus;
    turn: E.Turn;
    score: {
        [E.Turn.Player1]: number,
        [E.Turn.Player2]: number,
    };
    size: number;
}

export interface IGameEventHandlers {
    startNewGame: (e: Event) => void;
    resetScore: (e: Event) => void;
    clickSquare: (e: Event) => void;
}

export interface IViewConfig {
    selectors: IGameStateIdSelectors;
    events: IGameEventHandlers;
}
