import { userFieldState, enemyFieldState, gameConstants } from "../constants.js";
import changeEnemyShipPlacingStatus from "./functions/changeEnemyShipPlacingStatus.js";
import changeShotStatus from "./functions/changeShotStatus.js";

export default function getDataFromEnemyHandler(data) {
    const currentEnemyField = {...data.field};
    for (let i = 0; i <= enemyFieldState.length; i++) {
        if(currentEnemyField[i]) enemyFieldState[i] = currentEnemyField[i];
    }
    const currentEvent = data.currentEvent;
    if(currentEvent === 'shipsWasInstalled') {
        gameConstants.enemyShotStatus = data.gameConstants.userShotStatus;
        gameConstants.enemyShipPlacementStatus = data.gameConstants.userShipPlacementStatus;
        changeEnemyShipPlacingStatus();
        changeShotStatus();
    };
    if(currentEvent === 'goodShot') {
        const currentCell = userFieldState[data.gameConstants.currentShot.row][data.gameConstants.currentShot.column];
        /*cellNode: div.cell.1.01.gameFieldCell
        shipCell: div.shipCell.1
        shottedCell: true
        */
        currentCell.shottedCell = true;
        currentCell.cellNode.innerHTML = '';
        const img = document.createElement('img');
        img.style.width = '30px';
        img.style.height = '30px';
        img.src = '../../game_client/assets/goodShot.png';
        currentCell.cellNode.appendChild(img);

    };
    if(currentEvent === 'badShot') {
        gameConstants.userShotStatus = true;
        gameConstants.enemyShotStatus = false;
        changeShotStatus();
        const currentCell = userFieldState[data.gameConstants.currentShot.row][data.gameConstants.currentShot.column];
        currentCell.shottedCell = true;
        const img = document.createElement('img');
        img.style.width = '30px';
        img.style.height = '30px';
        img.src = '../../game_client/assets/badShot.png';
        currentCell.cellNode.appendChild(img);
    }
}