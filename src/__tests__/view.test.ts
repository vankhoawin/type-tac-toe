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
                body: dom.window.document.body,
                modal: dom.window.document.getElementById('modal')!,
                modalNewGameButton: dom.window.document.getElementById('js-modal-new-game-button')!,
                modalTitle: dom.window.document.getElementById('js-modal-title')!,
                player1Score: dom.window.document.getElementById('player-1-score')!,
                player1ScoreContainer: dom.window.document.getElementById(
                    'player-1-score-container',
                )!,
                player2Score: dom.window.document.getElementById('player-2-score')!,
                player2ScoreContainer: dom.window.document.getElementById(
                    'player-2-score-container',
                )!,
                resetGameButton: dom.window.document.getElementById('js-reset-game-button')!,
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

    it('tests `toggleModal`', () => {
        view.toggleModal(meta);
        expect(view.$.body.innerHTML).toMatchSnapshot();

        meta.status = E.Status.Victory;
        view.toggleModal(meta);
        expect(view.$.body.innerHTML).toMatchSnapshot();
    });

    it('tests `setModalTitle`', () => {
        meta.status = E.Status.Draw;
        view.setModalTitle(meta);
        expect(view.$.modal.innerHTML).toMatchSnapshot();

        meta.status = E.Status.Victory;
        view.setModalTitle(meta);
        expect(view.$.modal.innerHTML).toMatchSnapshot();
    });

    it('tests `toggleTurn`', () => {
        view.toggleTurn(E.Turn.Player1);
        expect(view.$.player1ScoreContainer.innerHTML).toMatchSnapshot();

        view.toggleTurn(E.Turn.Player2);
        expect(view.$.player2ScoreContainer.innerHTML).toMatchSnapshot();
    });

    it('tests `setScoreForPlayer`', () => {
        view.setScoreForPlayer(E.Turn.Player1, 1);
        expect(view.$.player1Score.innerHTML).toMatchSnapshot();

        view.setScoreForPlayer(E.Turn.Player2, 5);
        expect(view.$.player2Score.innerHTML).toMatchSnapshot();
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
});
