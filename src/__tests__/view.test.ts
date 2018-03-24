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
    let resetScoreMock: jest.Mock;
    let clickSquareMock: jest.Mock;
    let dom: JSDOM;
    let element: string;

    beforeEach(() => {
        meta = scaffold.meta;
        state = scaffold.state;
        startNewGameMock = jest.fn();
        resetScoreMock = jest.fn();
        clickSquareMock = jest.fn();
        dom = new JSDOM(scaffold.dom);

        view = new View({
            events: {
                clickSquare: clickSquareMock,
                resetScore: resetScoreMock,
                startNewGame: startNewGameMock,
            },
            selectors: {
                board: dom.window.document.getElementById('board')!,
                toolbar: dom.window.document.getElementById('toolbar')!,
            },
        });
    });

    it('tests `renderGame`', () => {
        // ensure dynamically created elements don't exist before initial render
        expect(view.$.newGameButton).toBeUndefined();
        expect(view.$.resetButton).toBeUndefined();
        expect(view.$.squares).toBeUndefined();

        view.renderGame(state, meta);

        // use mock DOM to reassign correct selectors and reattach
        view.$.newGameButton = dom.window.document.getElementById('js-new-button');
        view.$.resetButton = dom.window.document.getElementById('js-reset-button');
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square');
        view.attachEventListeners();

        const newGameButton: HTMLElement = view.$.newGameButton;
        const resetButton: HTMLElement = view.$.resetButton;
        const squares: HTMLElement = view.$.squares;

        expect(newGameButton).not.toBeUndefined();
        expect(resetButton).not.toBeUndefined();
        expect(squares).not.toBeUndefined();

        newGameButton.click();
        resetButton.click();
        view.$.board.click();

        expect(startNewGameMock).toHaveBeenCalled();
        expect(resetScoreMock).toHaveBeenCalled();
        expect(clickSquareMock).toHaveBeenCalled();
    });

    it('tests `attachEventListeners`', () => {
        // should be no-op
        view.attachEventListeners();

        view.$.board.innerHTML = view.renderGrid(state);
        view.$.toolbar.innerHTML = view.renderToolbar(meta);

        view.$.newGameButton = dom.window.document.getElementById('js-new-button')!;
        view.$.resetButton = dom.window.document.getElementById('js-reset-button')!;
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square')!;

        view.attachEventListeners();

        expect(startNewGameMock).not.toHaveBeenCalled();
        view.$.newGameButton.click();
        expect(startNewGameMock).toHaveBeenCalled();

        expect(resetScoreMock).not.toHaveBeenCalled();
        view.$.resetButton.click();
        expect(resetScoreMock).toHaveBeenCalled();

        expect(clickSquareMock).not.toHaveBeenCalled();
        view.$.board.click();
        expect(clickSquareMock).toHaveBeenCalled();
    });

    it('tests `removeEventListeners`', () => {
        // should be no-op
        view.removeEventListeners();

        view.$.board.innerHTML = view.renderGrid(state);
        view.$.toolbar.innerHTML = view.renderToolbar(meta);

        view.$.newGameButton = dom.window.document.getElementById('js-new-button')!;
        view.$.resetButton = dom.window.document.getElementById('js-reset-button')!;
        view.$.squares = dom.window.document.getElementsByClassName('js-board-square')!;

        view.attachEventListeners();

        view.$.newGameButton.click();
        view.$.resetButton.click();
        view.$.board.click();

        expect(startNewGameMock).toHaveBeenCalledTimes(1);
        expect(resetScoreMock).toHaveBeenCalledTimes(1);
        expect(clickSquareMock).toHaveBeenCalledTimes(1);

        view.removeEventListeners();

        view.$.newGameButton.click();
        view.$.resetButton.click();
        view.$.board.click();

        expect(startNewGameMock).toHaveBeenCalledTimes(1);
        expect(resetScoreMock).toHaveBeenCalledTimes(1);
        expect(clickSquareMock).toHaveBeenCalledTimes(1);
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
        const turn: E.Turn = E.Turn.Player1;

        element = view.renderSubheader({ status: E.Status.Draw, turn });
        expect(element).toMatchSnapshot();

        element = view.renderSubheader({ status: E.Status.InProgress, turn });
        expect(element).toMatchSnapshot();

        element = view.renderSubheader({ status: E.Status.Victory, turn });
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
