import * as E from '../enums';
import Logic from '../logic';
import * as T from '../types';
import scaffold from './scaffold';

describe('Logic', () => {
    let logic: any;
    let expected: boolean;
    let actual: boolean;

    beforeEach(() => {
        logic = new Logic();
    });

    it('tests `checkIfBoardIsFilled`', () => {
        const partiallyFilledBoard: T.GameStateGrid = scaffold.state;
        actual = logic.checkIfBoardIsFilled(partiallyFilledBoard);
        expected = false;

        expect(actual).toBe(expected);

        const fullBoard: T.GameStateGrid = scaffold.filledState;
        actual = logic.checkIfBoardIsFilled(fullBoard);
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `checkWinningConditionsOfMove`', () => {
        const move: T.IPoint = { row: 2, col: 2 };

        actual = logic.checkWinningConditionsOfMove(
            scaffold.winningState,
            move,
            E.Square.X,
            scaffold.meta.size,
        );
        expected = true;

        expect(actual).toBe(expected);

        actual = logic.checkWinningConditionsOfMove(
            scaffold.emptyState,
            move,
            E.Square.X,
            scaffold.meta.size,
        );
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `moveIsWithinBoundaries`', () => {
        const withinBoundaryPoint: T.IPoint = { row: 1, col: 1 };
        actual = logic.moveIsWithinBoundaries(withinBoundaryPoint, scaffold.meta.size);
        expected = true;

        expect(actual).toBe(expected);

        const negativeBoundPoint: T.IPoint = { row: -1, col: 0 };
        actual = logic.moveIsWithinBoundaries(negativeBoundPoint, scaffold.meta.size);
        expected = false;

        expect(actual).toBe(expected);

        const overBoundPoint: T.IPoint = { row: 0, col: 4 };
        actual = logic.moveIsWithinBoundaries(overBoundPoint, scaffold.meta.size);
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `columnHasWinningMoves`', () => {
        const xSquare: T.IPoint = { row: 0, col: 0 };

        actual = logic.isMatchingPoint(scaffold.state, xSquare, E.Square.X);
        expected = true;

        expect(actual).toBe(expected);

        actual = logic.isMatchingPoint(scaffold.state, xSquare, E.Square.O);
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `columnHasWinningMoves`', () => {
        const winningMoves: T.IPoint[] = scaffold.moves.winning;
        actual = logic.columnHasWinningMoves(
            scaffold.winningState,
            winningMoves,
            scaffold.meta.turn,
            scaffold.meta.size,
        );
        expected = true;

        expect(actual).toBe(expected);

        const losingMoves: T.IPoint[] = scaffold.moves.losing;
        actual = logic.columnHasWinningMoves(
            scaffold.state,
            losingMoves,
            scaffold.meta.turn,
            scaffold.meta.size,
        );
        expected = false;

        expect(actual).toBe(expected);
    });

    it('tests `isSquareNotEmpty`', () => {
        const emptySquare: E.Square = E.Square.Empty;
        actual = logic.isSquareNotEmpty(emptySquare);
        expected = false;

        expect(actual).toBe(expected);

        const oSquare: E.Square = E.Square.O;
        actual = logic.isSquareNotEmpty(oSquare);
        expected = true;

        expect(actual).toBe(expected);

        const xSquare: E.Square = E.Square.X;
        actual = logic.isSquareNotEmpty(xSquare);
        expected = true;

        expect(actual).toBe(expected);
    });
});
