import * as E from './enums';
import * as T from './types';

export default class Logic {
    public checkIfBoardIsFilled(grid: T.GameStateGrid): boolean {
        return grid.every((row) => row.every(this.isSquareNotEmpty));
    }

    public checkWinningConditionsOfMove(
        grid: T.GameStateGrid,
        { row, col }: T.IPoint,
        square: E.Square,
        boardSize: number,
    ): boolean {
        const diagonalDownRightMoves: T.IPoint[] = [];
        for (
            let i = 0, j = col - row;
            this.moveIsWithinBoundaries({ row: i, col: j }, boardSize);
            ++i, ++j
        ) {
            diagonalDownRightMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(grid, diagonalDownRightMoves, square, boardSize)) {
            return true;
        }

        const diagonalDownLeftMoves: T.IPoint[] = [];
        for (
            let i = 0, j = col + row;
            this.moveIsWithinBoundaries({ row: i, col: j }, boardSize);
            ++i, --j
        ) {
            diagonalDownLeftMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(grid, diagonalDownLeftMoves, square, boardSize)) {
            return true;
        }

        const columnMoves: T.IPoint[] = [];
        for (
            let i = row, j = 0;
            this.moveIsWithinBoundaries({ row: i, col: j }, boardSize);
            ++j
        ) {
            columnMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(grid, columnMoves, square, boardSize)) {
            return true;
        }

        const rowMoves: T.IPoint[] = [];
        for (
            let i = 0, j = col;
            this.moveIsWithinBoundaries({ row: i, col: j }, boardSize);
            ++i
        ) {
            rowMoves.push({ row: i, col: j });
        }
        if (this.columnHasWinningMoves(grid, rowMoves, square, boardSize)) {
            return true;
        }

        return false;
    }

    private moveIsWithinBoundaries(
        { row, col }: T.IPoint,
        boardSize: number,
    ): boolean {
        return (
            row < boardSize && row >= 0 &&
            col < boardSize && col >= 0
        );
    }

    private isMatchingPoint(
        grid: T.GameStateGrid,
        { row, col }: T.IPoint,
        square: E.Square,
    ): boolean {
        return grid[row][col] === square;
    }

    private columnHasWinningMoves(
        grid: T.GameStateGrid,
        moves: T.IPoint[],
        square: E.Square,
        boardSize: number,
    ): boolean {
        return (
            moves.length === boardSize &&
            moves.every((point: T.IPoint) => this.isMatchingPoint(grid, point, square))
        );
    }

    private isSquareNotEmpty(square: E.Square): boolean {
        return square !== E.Square.Empty;
    }
}
