import TypeTacToe from './TypeTacToe';

import './styles/index.scss';

const modelConfig = {
    size: 4,
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
