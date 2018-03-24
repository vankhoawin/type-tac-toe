import config from '../config';
import TypeTacToe from './TypeTacToe';

import './styles/index.scss';

const modelConfig = {
    size: config.BOARD_SIZE,
};

const $body: HTMLElement = document.body;
const $board: HTMLElement = document.getElementById('board')!;
const $modal: HTMLElement = document.getElementById('modal')!;
const $modalNewGameButton: HTMLElement = document.getElementById('js-modal-new-game-button')!;
const $modalTitle: HTMLElement = document.getElementById('js-modal-title')!;
const $resetGameButton: HTMLElement = document.getElementById('js-reset-game-button')!;
const $player1Score: HTMLElement = document.getElementById('player-1-score')!;
const $player1ScoreContainer: HTMLElement = document.getElementById('player-1-score-container')!;
const $player2Score: HTMLElement = document.getElementById('player-2-score')!;
const $player2ScoreContainer: HTMLElement = document.getElementById('player-2-score-container')!;

const gameState = new TypeTacToe({
    model: modelConfig,
    selectors: {
        board: $board,
        body: $body,
        modal: $modal,
        modalNewGameButton: $modalNewGameButton,
        modalTitle: $modalTitle,
        player1Score: $player1Score,
        player1ScoreContainer: $player1ScoreContainer,
        player2Score: $player2Score,
        player2ScoreContainer: $player2ScoreContainer,
        resetGameButton: $resetGameButton,
    },
});

gameState.rerender();
