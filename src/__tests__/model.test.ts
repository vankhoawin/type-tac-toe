import * as E from '../enums';
import Model from '../model';
import * as T from '../types';
import scaffold from './scaffold';

describe('Model', () => {
    let model: any;
    let actual: any;
    let expected: any;

    beforeEach(() => {
        model = new Model({ size: scaffold.meta.size });
    });

    it('tests `state` immutability', () => {
        actual = model.state === model.state;
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `meta` immutability', () => {
        actual = model.meta === model.meta;
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests get `status`', () => {
        actual = model.status === model.meta.status;
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `setStatus`', () => {
        const oldStatus: E.Status = model.status;
        model.setStatus(E.Status.Victory);
        actual = oldStatus === model.status;
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests get `turn`', () => {
        actual = model.meta.turn === model.turn;
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `toggleTurn`', () => {
        let previousTurn: E.Turn = model.turn;

        model.toggleTurn(previousTurn);

        actual = previousTurn === model.turn;
        expected = false;

        expect(actual).toBe(expected);

        previousTurn = model.turn;

        model.toggleTurn(previousTurn);

        actual = previousTurn === model.turn;
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests get `size`', () => {
        actual = model.meta.size === model.size;
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `getSquare`', () => {
        const scaffoldedSquare: E.Square = E.Square.Empty;
        const squareFromModel: E.Square = model.getSquare({ row: 0, col: 0 });

        actual = scaffoldedSquare === squareFromModel;
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `setSquare`', () => {
        const point: T.IPoint = { row: 0, col: 0 };
        const oldSquare: E.Square = model.getSquare(point);

        model.setSquare(point, E.Square.X);

        actual = model.getSquare(point) === oldSquare;
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `getScoreForPlayer`', () => {
        const player: E.Turn = E.Turn.Player1;
        const score: number = model.getScoreForPlayer(player);
        actual = typeof score === 'number';
        expected = true;

        expect(actual).toBe(expected);

    });

    it('tests `resetScoreForPlayer`', () => {
        const player: E.Turn = E.Turn.Player1;

        model.setScoreForPlayer(player, 2);

        const oldScore: number = model.getScoreForPlayer(player);
        model.resetScoreForPlayer(player);

        const zeroScore: number = model.getScoreForPlayer(player);
        actual = (zeroScore !== oldScore) && (zeroScore === 0);
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `incrementScoreForPlayer`', () => {
        const player: E.Turn = E.Turn.Player1;
        let previousScore: number = model.getScoreForPlayer(player);

        model.incrementScoreForPlayer(player);

        actual = previousScore === model.getScoreForPlayer(player);
        expected = false;

        expect(actual).toBe(expected);

        previousScore = model.getScoreForPlayer(player);

        model.incrementScoreForPlayer(player);

        actual = previousScore === model.getScoreForPlayer(player) - 1;
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `resetBoard`', () => {
        const point: T.IPoint = { row: 0, col: 0 };
        const square: E.Square = E.Square.O;

        model.setSquare(point, square);

        const previousSquare = model.getSquare(point);

        model.resetBoard();

        actual = previousSquare === model.getSquare(point);
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `getEmptyBoard`', () => {
        const emptyBoard: T.GameStateGrid = model.getEmptyBoard();

        actual = emptyBoard === model.state;
        expected = false;

        expect(actual).toBe(expected);
    });
});
