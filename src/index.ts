import TypeTacToe from './TypeTacToe';

import './styles/index.scss';

// load from webpack global variables
declare var BOARD_SIZE: number;

const modelConfig = {
    size: BOARD_SIZE,
};
const $board: HTMLElement = document.getElementById('board')!;
const $toolbar: HTMLElement = document.getElementById('toolbar')!;
const gameState = new TypeTacToe({
    model: modelConfig,
    selectors: {
        board: $board,
        toolbar: $toolbar,
    },
});

gameState.rerender();
