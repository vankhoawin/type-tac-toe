import * as Enums from './enums';

export type Point = {
    row: number,
    col: number,
};
export type CurrentStatus = Enums.Status.Finished | Enums.Status.InProgress;
export type GameStateSquare = Enums.Square.Empty | Enums.Square.X | Enums.Square.O;
export type GameStateRow = [GameStateSquare, GameStateSquare, GameStateSquare];
export type GameStateGrid = [GameStateRow, GameStateRow, GameStateRow];
export type GameStateIdSelectors = {
    [key: string]: HTMLElement,
};
export type GameStateClassSelectors = {
    squares?: HTMLCollectionOf<Element>,
};
export type GameStateMeta = {
    status: CurrentStatus,
    turn: Enums.Turn,
    score: {
        player1: number,
        player2: number,
    },
};
export type GameEventHandlers = {
    startNewGame: (e: Event) => void,
    resetScore: (e: Event) => void,
    clickSquare: (e: Event) => void,
}
export type View = {
    selectors: GameStateIdSelectors,
    events: GameEventHandlers,
}
