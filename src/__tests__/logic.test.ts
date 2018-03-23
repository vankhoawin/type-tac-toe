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

        const fullBoard: T.GameStateGrid = [
            [E.Square.X, E.Square.X, E.Square.X],
            [E.Square.X, E.Square.X, E.Square.X],
            [E.Square.X, E.Square.X, E.Square.X],
        ];
        actual = logic.checkIfBoardIsFilled(fullBoard);
        expected = true;

        expect(actual).toBe(expected);
    });

    it('tests `checkWinningConditionsOfMove`', () => {
        const diagonalDownRightWin = [
            [E.Square.X, E.Square.Empty, E.Square.Empty],
            [E.Square.Empty, E.Square.X, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.X],
        ];
        actual = logic.checkWinningConditionsOfMove(
            diagonalDownRightWin,
            { row: 2, col: 2 },
            E.Square.X,
            scaffold.meta.size,
        );
        expected = true;
        expect(actual).toBe(expected);

        const diagonalDownLeftWin = [
            [E.Square.Empty, E.Square.Empty, E.Square.X],
            [E.Square.Empty, E.Square.X, E.Square.Empty],
            [E.Square.X, E.Square.Empty, E.Square.Empty],
        ];
        actual = logic.checkWinningConditionsOfMove(
            diagonalDownLeftWin,
            { row: 2, col: 0 },
            E.Square.X,
            scaffold.meta.size,
        );
        expected = true;
        expect(actual).toBe(expected);

        const rowWin = [
            [E.Square.X, E.Square.X, E.Square.X],
            [E.Square.Empty, E.Square.Empty, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.Empty],
        ];
        actual = logic.checkWinningConditionsOfMove(
            rowWin,
            { row: 0, col: 1 },
            E.Square.X,
            scaffold.meta.size,
        );
        expected = true;
        expect(actual).toBe(expected);

        const columnWin = [
            [E.Square.Empty, E.Square.Empty, E.Square.X],
            [E.Square.Empty, E.Square.Empty, E.Square.X],
            [E.Square.Empty, E.Square.Empty, E.Square.X],
        ];
        actual = logic.checkWinningConditionsOfMove(
            columnWin,
            { row: 0, col: 2 },
            E.Square.X,
            scaffold.meta.size,
        );
        expected = true;
        expect(actual).toBe(expected);

        const notWinningBoard = [
            [E.Square.O, E.Square.X, E.Square.X],
            [E.Square.Empty, E.Square.X, E.Square.O],
            [E.Square.O, E.Square.O, E.Square.X],
        ];
        actual = logic.checkWinningConditionsOfMove(
            notWinningBoard,
            { row: 0, col: 2 },
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
        const winningState: T.GameStateGrid = [
            [E.Square.X, E.Square.O, E.Square.Empty],
            [E.Square.Empty, E.Square.X, E.Square.Empty],
            [E.Square.Empty, E.Square.Empty, E.Square.X],
        ];
        const winningMoves: T.IPoint[] = scaffold.moves.winning;
        actual = logic.columnHasWinningMoves(
            winningState,
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
