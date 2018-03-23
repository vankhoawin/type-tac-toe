import * as E from '../enums';

export default {
    DOM: `
        <div id="app" class="app">
            <header class="header">
                <h1>Type-Tac-Toe</h1>
            </header>
            <div id="board" class="board"></div>
            <div id="toolbar" class="toolbar"></div>
        </div>
    `,
    meta: {
        score: {
            [E.Turn.Player1]: 3,
            [E.Turn.Player2]: 2,
        },
        size: 3,
        status: E.Status.InProgress,
        turn: E.Turn.Player1,
    },
    moves: {
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
    },
    state: [
        [E.Square.X, E.Square.O, E.Square.Empty],
        [E.Square.Empty, E.Square.X, E.Square.Empty],
        [E.Square.Empty, E.Square.Empty, E.Square.Empty],
    ],
};
