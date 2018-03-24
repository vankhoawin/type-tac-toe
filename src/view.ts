import * as E from './enums';
import * as T from './types';

export default class View {
    private $: T.IGameStateIdSelectors & T.IGameStateClassSelectors;
    private events: T.IGameEventHandlers;

    constructor({ selectors, events }: T.IViewConfig) {
       this.$ = selectors;
       this.events = events;

       this.$.modalNewGameButton.addEventListener('click', this.events.startNewGame);
       this.$.resetGameButton.addEventListener('click', this.events.startNewGame);
    }

    public renderGame(state: T.GameStateGrid, meta: T.IGameStateMeta): void {
        this.$.board.innerHTML = this.renderGrid(state, meta.lastMove);

        this.removeBoardEventListener();
        // add dynamically created selectors
        this.$.squares = document.getElementsByClassName('js-board-square')!;
        this.attachBoardEventListener();
    }

    public toggleModal(meta: T.IGameStateMeta): void {
        if (meta.status !== E.Status.InProgress) {
            this.$.body.setAttribute('data-is-modal-open', 'true');
            this.setModalTitle(meta);
        } else {
            this.$.body.removeAttribute('data-is-modal-open');
        }
    }

    public setModalTitle(meta: T.IGameStateMeta): void {
        let modalTitle: string = '';

        if (meta.status === E.Status.Draw) {
            modalTitle = `It's a draw!`;
        } else if (meta.status === E.Status.Victory) {
            modalTitle = `Player ${meta.turn} wins!`;
        }

        this.$.modalTitle.innerText = modalTitle;
    }

    public toggleTurn(turn: E.Turn): void {
        if (turn === E.Turn.Player1) {
            this.$.player1ScoreContainer.setAttribute('data-is-current-turn', 'true');
            this.$.player2ScoreContainer.removeAttribute('data-is-current-turn');
        } else {
            this.$.player1ScoreContainer.removeAttribute('data-is-current-turn');
            this.$.player2ScoreContainer.setAttribute('data-is-current-turn', 'true');
        }
    }

    public setScoreForPlayer(turn: E.Turn, score: number): void {
        if (turn === E.Turn.Player1) {
            this.$.player1Score.innerHTML = String(score);
        } else {
            this.$.player2Score.innerHTML = String(score);
        }
    }

    private removeBoardEventListener(): void {
        // on first run, dynamically created selectors do not exist
        if (!this.$.board) {
            return;
        }

        this.$.board.removeEventListener('click', this.events.clickSquare);
    }

    private attachBoardEventListener(): void {
        if (!this.$.board) {
            return;
        }

        this.$.board.addEventListener('click', this.events.clickSquare);
    }

    private renderSquare(square: E.Square, { row, col }: T.IPoint, lastMove: T.IPoint): string {
        const sRow: string = `data-row=${row}`;
        const sCol: string = `data-col=${col}`;
        const isLastMovedSquare: boolean = lastMove.row === row && lastMove.col === col;
        let commonClasses: string = 'js-board-square board__square board__square';

        if (isLastMovedSquare) {
            commonClasses = `board__square--is-last-moved ${commonClasses}`;
        }

        if (square === E.Square.X) {
            return `
                <button ${sRow} ${sCol} class="${commonClasses}--X">
                    <span>X</span>
                </button>
            `;
        } else if (square === E.Square.O) {
            return `
                <button ${sRow} ${sCol} class="${commonClasses}--O">
                    <span>O</span>
                </button>
            `;
        } else {
            return `<button ${sRow} ${sCol} class="${commonClasses}--empty"></button>`;
        }
    }

    private renderGrid(grid: T.GameStateGrid, lastMove: T.IPoint): string {
        const html: string = grid.reduce((acc, row, i) => (
            acc + row.reduce((acc2, square, j) => (
                acc2 + this.renderSquare(square, { row: i, col: j }, lastMove)
             ), '')
        ), '');

        return html;
    }

    private renderScore(meta: T.IGameStateMeta, player: E.Turn): string {
        const score: number = meta.score[player];
        const isPlayerCurrentTurn = meta.turn === player
            ? ' toolbar__score-container--is-current-turn'
            : '';

        return `
            <div class="toolbar__score-container${isPlayerCurrentTurn}">
                <div>Player ${player}</div>
                <div class="toolbar__player-${player}-score">${score}</div>
            </div>
        `;
    }
}
