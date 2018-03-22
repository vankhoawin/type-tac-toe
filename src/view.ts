import * as Types from './types';
import * as Enums from './enums';

export default class View {
    private $: Types.GameStateIdSelectors & Types.GameStateClassSelectors;
    private events: Types.GameEventHandlers;

    constructor({ selectors, events }: Types.View) {
       this.$ = selectors;
       this.events = events;
    }

    public renderGame(state: Types.GameStateGrid, meta: Types.GameStateMeta): void {
        this.$.board.innerHTML = this.renderGrid(state);
        this.$.toolbar.innerHTML = this.renderToolbar(meta);

        // add dynamically created selectors
        this.$.newGameButton = document.getElementById('js-new-button')!;
        this.$.resetButton = document.getElementById('js-reset-button')!;
        this.$.squares = document.getElementsByClassName('js-board-square')!;

        this.attachEventListeners();
    }

    private removeEventListeners() {
        this.$.newGameButton.removeEventListener('click', this.events.startNewGame);
        this.$.resetButton.removeEventListener('click', this.events.resetScore);
        this.$.board.removeEventListener('click', this.events.clickSquare);
    }

    private attachEventListeners() {
        this.$.newGameButton.addEventListener('click', this.events.startNewGame);
        this.$.resetButton.addEventListener('click', this.events.resetScore);
        this.$.board.addEventListener('click', this.events.clickSquare);
    }
    private renderSquare(type: Enums.Square, rowIndex: number, colIndex: number): string {
        const commonClasses = 'js-board-square board__square board__square';
        const row = `data-row=${rowIndex}`;
        const col = `data-col=${colIndex}`;

        if (type === Enums.Square.X) {
            return `<button ${row} ${col} class="${commonClasses}--X">X</button>`;
        } else if (type === Enums.Square.O) {
            return `<button ${row} ${col} class="${commonClasses}--O">O</button>`;
        } else {
            return `<button ${row} ${col} class="${commonClasses}--empty"></button>`;
        }
    }

    private renderGrid(grid: Types.GameStateGrid): string {
        const html: string = grid.reduce((acc, row, i) => (
            acc + row.reduce((acc2, square, j) => (
                acc2 + this.renderSquare(square, i, j)
             ), '')
        ), '');

        return html;
    }

    private renderVictory(turn: Enums.Turn): string {
        return `Player ${turn} wins!`;
    }

    private renderPlayerTurn(turn: Enums.Turn): string {
        return `Player ${turn}'s turn.`;
    }

    private renderScore(player: Enums.Turn, score: number): string {
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

    private renderToolbar(meta: Types.GameStateMeta): string {
        const turn: string = `
            <h2 class="toolbar__turn-container">
                ${meta.status === Enums.Status.Finished
                    ? this.renderVictory(meta.turn)
                    : this.renderPlayerTurn(meta.turn)
                }
            </h2>
        `;
        const score: string = `
            <div class="toolbar__score-container">
                ${this.renderScore(Enums.Turn.Player1, meta.score.player1)}
                ${this.renderScore(Enums.Turn.Player2, meta.score.player2)}
            </div>
        `;
        const toolbar: string = this.renderToolbarButtons();

        return score + turn + toolbar;
    } 
}
