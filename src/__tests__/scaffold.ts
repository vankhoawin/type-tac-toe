import * as E from '../enums';

export default {
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
