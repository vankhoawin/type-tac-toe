import 'jest';
import * as E from '../enums';
import * as T from '../types';
import View from '../view';

describe('View', () => {
    const defaults = {
        meta: {
            score: {
                [E.Turn.Player1]: 3,
                [E.Turn.Player2]: 2,
            },
            size: 3,
            status: E.Status.InProgress,
            turn: E.Turn.Player1,
        },
        state: [
            [E.Square.X, E.Square.O, E.Square.Empty],
            [E.Square.Empty, E.Square.X, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.X],
        ],
    };
    let meta: T.IGameStateMeta;
    let state: T.GameStateGrid;
    let view: any;
    let startNewGameMock: jest.Mock;
    let resetScoreMock: jest.Mock;
    let clickSquareMock: jest.Mock;
    let element: string;

    beforeEach(() => {
        meta = defaults.meta;
        state = defaults.state;
        startNewGameMock = jest.fn();
        resetScoreMock = jest.fn();
        clickSquareMock = jest.fn();
        view = new View({
            events: {
                clickSquare: clickSquareMock,
                resetScore: resetScoreMock,
                startNewGame: startNewGameMock,
            },
            selectors: {
                board: document.getElementById('.board')!,
                toolbar: document.getElementById('.toolbar')!,
            },
        });
    });

    ['X', 'O', 'empty'].forEach((squareType, index) => {
        it(`renders an ${squareType} square`, () => {
            element = view.renderSquare(state[0][index], 0, index);

            expect(element).toMatchSnapshot();
        });

    });

    it('renders a grid', () => {
        element = view.renderGrid(state);

        expect(element).toMatchSnapshot();
    });

    it('renders a score subheader', () => {
        element = view.renderSubheader(meta);

        expect(element).toMatchSnapshot();
    });

    it('renders a score container', () => {
        element = view.renderScore(meta.turn, meta.score[meta.turn]);

        expect(element).toMatchSnapshot();
    });

    it('renders toolbar buttons', () => {
        element = view.renderToolbarButtons();

        expect(element).toMatchSnapshot();
    });

    it('renders a toolbar', () => {
        element = view.renderToolbar(meta);

        expect(element).toMatchSnapshot();
    });
});
