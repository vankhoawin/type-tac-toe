import * as E from './enums';

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
    status: E.Status;
    turn: E.Turn;
    score: {
        [E.Turn.Player1]: number,
        [E.Turn.Player2]: number,
    };
    size: number;
    lastMove: IPoint;
}

export interface IGameEventHandlers {
    startNewGame: (e: Event) => void;
    resetScore: (e: Event) => void;
    clickSquare: (e: Event) => void;
}

export interface ITypeTacToeConfig {
    model: IModelConfig;
    selectors: IGameStateIdSelectors;
}

export interface IViewConfig {
    selectors: IGameStateIdSelectors;
    events: IGameEventHandlers;
}
