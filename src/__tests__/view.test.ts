import { JSDOM } from 'jsdom';
import * as E from '../enums';
import * as T from '../types';
import View from '../view';
import scaffold from './scaffold';

describe('View', () => {
    let meta: T.IGameStateMeta;
    let state: T.GameStateGrid;
    let view: any;
    let startNewGameMock: jest.Mock;
    let clickSquareMock: jest.Mock;
    let dom: JSDOM;
    let element: string;

    beforeEach(() => {
        meta = scaffold.meta;
        state = scaffold.state;
        startNewGameMock = jest.fn();
        clickSquareMock = jest.fn();
        dom = new JSDOM(scaffold.dom);

        view = new View({
            events: {
                clickSquare: clickSquareMock,
                startNewGame: startNewGameMock,
            },
            selectors: {
                board: dom.window.document.getElementById('board')!,
                newGameButton: dom.window.document.getElementById('js-new-button')!,
                player1ScoreContainer: dom.window.document.getElementById(
                    'player-1-score-container',
                )!,
                player2ScoreContainer: dom.window.document.getElementById(
                    'player-2-score-container',
                )!,
            },
        });
    });

    it('tests `renderGame`', () => {
        // ensure dynamically created elements don't exist before initial render
        expect(view.$.squares).toBeUndefined();

        view.renderGame(state, meta);

        // use mock DOM to reassign correct selectors and reattach
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square');
        view.attachBoardEventListener();

        const squares: HTMLElement = view.$.squares;

        expect(squares).not.toBeUndefined();

        view.$.board.click();

        expect(clickSquareMock).toHaveBeenCalled();
    });

    it('tests `attachBoardEventListener`', () => {
        // should be no-op
        view.attachBoardEventListener();

        view.$.board.innerHTML = view.renderGrid(state, meta);
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square')!;

        view.attachBoardEventListener();

        expect(clickSquareMock).not.toHaveBeenCalled();

        view.$.board.click();
        expect(clickSquareMock).toHaveBeenCalled();
    });

    it('tests `removeBoardEventListener`', () => {
        // should be no-op
        view.removeBoardEventListener();

        view.$.board.innerHTML = view.renderGrid(state, meta);
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square')!;

        view.attachBoardEventListener();
        view.$.board.click();

        expect(clickSquareMock).toHaveBeenCalledTimes(1);

        view.removeBoardEventListener();
        view.$.board.click();

        expect(clickSquareMock).toHaveBeenCalledTimes(1);
    });

    ['X', 'O', 'empty'].forEach((squareType, index) => {
        it(`renders an ${squareType} square`, () => {
            element = view.renderSquare(state[0][index], 0, index);

            expect(element).toMatchSnapshot();
        });

    });

    it('renders a grid', () => {
        element = view.renderGrid(state, meta);

        expect(element).toMatchSnapshot();
    });

    it('renders a score subheader', () => {
        const turn: E.Turn = E.Turn.Player1;

        element = view.renderSubheader({ status: E.Status.Draw, turn });
        expect(element).toMatchSnapshot();

        element = view.renderSubheader({ status: E.Status.InProgress, turn });
        expect(element).toMatchSnapshot();

        element = view.renderSubheader({ status: E.Status.Victory, turn });
        expect(element).toMatchSnapshot();
    });

    it('renders a score container', () => {
        element = view.renderScore(meta, meta.score[meta.turn]);

        expect(element).toMatchSnapshot();
    });
});
