import { ANSI } from "./utils/ansi.mjs"; 
import KeyBoardManager, { print, clearScreen, printCentered } from "./utils/io.mjs"; 
import SplashScreen from "./game/splash.mjs"; 
import createMenu from "./utils/menu.mjs"; 
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs"; 
import createInBetweenScreen from "./game/inBetweenScreen.mjs"; 
import createBattleshipScreen from "./game/battleshipsScreen.mjs"; 
import { setLanguage, t } from "./utils/dictionary.mjs"; 
import { FIRST_PLAYER, SECOND_PLAYER, GAME_BOARD_DIM } from "./consts.mjs"; 

let currentState = null; 
let gameLoop = null; 

const REQUIRED_COLUMNS = 80; 
const REQUIRED_ROWS = 24;    

function checkResolution() {
    const { columns, rows } = process.stdout; 

    if (columns < REQUIRED_COLUMNS || rows < REQUIRED_ROWS) { 
        clearScreen(); 
        printCentered(`Minimum required: ${REQUIRED_COLUMNS}x${REQUIRED_ROWS}\n`); 
        printCentered(`Current size: ${columns}x${rows}\n`); 
        printCentered(`Please resize your terminal and press Enter to continue.`);

        process.stdin.once("keypress", () => { 
            
            checkResolution(); 
        });
        return false; 
    }
    return true; 
}

function update() {

    if (isBlocked) { return; }
    isBlocked = true;
    state.update();
    state.draw();
    isBlocked = false;
}

init();


