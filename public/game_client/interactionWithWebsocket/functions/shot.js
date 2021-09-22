import { enemyFieldState, gameConstants } from "../../constants.js";
import sendDataToEnemy from "../sendDataToEnemy.js";
import changeShotStatus from "./changeShotStatus.js";
import isItDeadShip from "./isItDeadShip.js";

export default function shot(cell) {
    const currentRow = +cell.classList[1];
    const currentColumn = +cell.classList[2];
    if(
        !enemyFieldState[currentRow][currentColumn].shottedCell && 
        gameConstants.enemyShipPlacementStatus
        ){
        const img = document.createElement('img');
        img.style.width = '30px';
        img.style.height = '30px';
        gameConstants.currentShot = {
            row: currentRow,
            column: currentColumn
        }
        enemyFieldState[currentRow][currentColumn].shottedCell = true;
        if(enemyFieldState[currentRow][currentColumn].shipCell){
            img.src = '../../game_client/assets/goodShot.png';
            sendDataToEnemy('goodShot');
            isItDeadShip(enemyFieldState, gameConstants.currentShot);
            //ДОБАВИТЬ ПРОВЕРКУ ВЕСЬ ЛИ КОРАБЛИК СБИТ!!!!!!!!!!!!
        } else {
            img.src = '../../game_client/assets/badShot.png';
            gameConstants.userShotStatus = false;
            gameConstants.enemyShotStatus = true;
            sendDataToEnemy('badShot');
            changeShotStatus();
        };
        cell.appendChild(img);
    }

}