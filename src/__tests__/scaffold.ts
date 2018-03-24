import * as E from '../enums';
import * as T from '../types';

interface IMoves {
    losing: T.IPoint[];
    winning: T.IPoint[];
}

export default class Scaffold {
    private static DOM: string = `
        <div id="app" class="app">
            <header class="header">
                <button
                    id="js-new-button"
                    class="header__new-game-button"
                    type="button"
                >
                    New Game
                </button>
                <h1>Type-Tac-Toe</h1>
            </header>
            <div id="board" class="board"></div>
            <div id="toolbar" class="toolbar">
                <div
                    id="player-1-score-container"
                    class="toolbar__score-container"
                    data-is-current-turn="true"
                >
                    <div class="toolbar__player-title">Player 1</div>
                    <div class="toolbar__score toolbar__score--1">0</div>
                </div>
                <div
                    id="player-2-score-container"
                    class="toolbar__score-container"
                >
                    <div class="toolbar__player-title">Player 2</div>
                    <div class="toolbar__score toolbar__score--2">0</div>
                </div>
            </div>
        </div>
    `;

    private static META: T.IGameStateMeta = {
        lastMove: { row: 1, col: 1 },
        score: {
            [E.Turn.Player1]: 3,
            [E.Turn.Player2]: 2,
        },
        size: 3,
        status: E.Status.InProgress,
        turn: E.Turn.Player1,
    };

    private static MOVES: IMoves = {
        losing: [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
        ],
        winning: [
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 2, col: 2 },
        ],
    };

    private static STATE: T.GameStateGrid = [
        [E.Square.X, E.Square.O, E.Square.Empty],
        [E.Square.Empty, E.Square.X, E.Square.Empty],
        [E.Square.Empty, E.Square.Empty, E.Square.Empty],
    ];

    public static get dom(): string {
        return this.DOM;
    }

    public static get meta(): T.IGameStateMeta {
        return {
            ...this.META,
            score: { ...this.META.score },
        };
    }

    public static get moves(): IMoves {
        return {
            ...this.MOVES,
            losing: [...this.MOVES.losing],
            winning: [...this.MOVES.winning],
        };
    }

    public static get state(): T.GameStateGrid {
        return [...this.STATE];
    }
}
