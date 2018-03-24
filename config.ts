// variables shared between JS and CSS
interface IConfig {
    BOARD_SIZE: number;
    GA_ANALYTICS: string;
    PORT: number;
}

const config: IConfig = {
    BOARD_SIZE: 3,
    GA_ANALYTICS: 'UA-116278935-1',
    PORT: 3000,
};

export default config;
