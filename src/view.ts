import * as E from './enums';
import * as T from './types';

export default class View {
    private $: T.IGameStateIdSelectors & T.IGameStateClassSelectors;
    private events: T.IGameEventHandlers;

    constructor({ selectors, events }: T.IViewConfig) {
       this.$ = selectors;
       this.events = events;
    }

    public renderGame(state: T.GameStateGrid, meta: T.IGameStateMeta): void {
        this.$.board.innerHTML = this.renderGrid(state);
        this.$.toolbar.innerHTML = this.renderToolbar(meta);

        this.removeEventListeners();
        // add dynamically created selectors
        this.$.newGameButton = document.getElementById('js-new-button')!;
        this.$.resetButton = document.getElementById('js-reset-button')!;
        this.$.squares = document.getElementsByClassName('js-board-square')!;
        this.attachEventListeners();
    }

    private removeEventListeners(): void {
        // on first run, dynamically created selectors do not exist
        if (!this.$.newGameButton || !this.$.resetButton || !this.$.board) {
            return;
        }

        this.$.newGameButton.removeEventListener('click', this.events.startNewGame);
        this.$.resetButton.removeEventListener('click', this.events.resetScore);
        this.$.board.removeEventListener('click', this.events.clickSquare);
    }

    private attachEventListeners(): void {
        if (!this.$.newGameButton || !this.$.resetButton || !this.$.board) {
            return;
        }

        this.$.newGameButton.addEventListener('click', this.events.startNewGame);
        this.$.resetButton.addEventListener('click', this.events.resetScore);
        this.$.board.addEventListener('click', this.events.clickSquare);
    }

    private renderSquare(square: E.Square, rowIndex: number, colIndex: number): string {
        const commonClasses = 'js-board-square board__square board__square';
        const row = `data-row=${rowIndex}`;
        const col = `data-col=${colIndex}`;

        if (square === E.Square.X) {
            return `<button ${row} ${col} class="${commonClasses}--X">X</button>`;
        } else if (square === E.Square.O) {
            return `<button ${row} ${col} class="${commonClasses}--O">O</button>`;
        } else {
            return `<button ${row} ${col} class="${commonClasses}--empty"></button>`;
        }
    }

    private renderGrid(grid: T.GameStateGrid): string {
        const html: string = grid.reduce((acc, row, i) => (
            acc + row.reduce((acc2, square, j) => (
                acc2 + this.renderSquare(square, i, j)
             ), '')
        ), '');

        return html;
    }

    private renderSubheader(meta: T.IGameStateMeta): string {
        if (meta.status === E.Status.Draw) {
            return `Draw!`;
        } else if (meta.status === E.Status.Victory) {
            return `Player ${meta.turn} wins!`;
        }

        return `Player ${meta.turn}'s turn.`;
    }

    private renderScore(player: E.Turn, score: number): string {
        return `
            <div class="toolbar__score">
                Player ${player}: ${score}
            </div>
        `;
    }

    private renderToolbarButtons(): string {
        return `
            <div class="toolbar__button-container">
                <button
                    id="js-new-button"
                    class="toolbar__button"
                    type="button"
                >
                    New Game
                </button>
                <button
                    id="js-reset-button"
                    class="toolbar__button"
                    type="button"
                >
                    Reset Score
                </button>
            </div>
        `;
    }

    private renderToolbar(meta: T.IGameStateMeta): string {
        const turn: string = `
            <h2 class="toolbar__subheader">
                ${this.renderSubheader(meta)}
            </h2>
        `;
        const score: string = `
            <div class="toolbar__score-container">
                ${this.renderScore(E.Turn.Player1, meta.score[E.Turn.Player1])}
                ${this.renderScore(E.Turn.Player2, meta.score[E.Turn.Player2])}
            </div>
        `;
        const toolbar: string = this.renderToolbarButtons();

        return score + turn + toolbar;
    }
}
