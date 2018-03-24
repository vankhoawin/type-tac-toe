import config from '../config';
import TypeTacToe from './TypeTacToe';

import './styles/index.scss';

const modelConfig = {
    size: config.BOARD_SIZE,
};
const $board: HTMLElement = document.getElementById('board')!;
const $newGameButton: HTMLElement = document.getElementById('js-new-button')!;
const $player1ScoreContainer: HTMLElement = document.getElementById('player-1-score-container')!;
const $player2ScoreContainer: HTMLElement = document.getElementById('player-2-score-container')!;
const gameState = new TypeTacToe({
    model: modelConfig,
    selectors: {
        board: $board,
        newGameButton: $newGameButton,
        player1ScoreContainer: $player1ScoreContainer,
        player2ScoreContainer: $player2ScoreContainer,
    },
});

gameState.rerender();
