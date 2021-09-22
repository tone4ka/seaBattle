import { gameConstants } from "../constants.js";
import changeEnemyShipPlacingStatus from "./functions/changeEnemyShipPlacingStatus.js";
import changeShotStatus from "./functions/changeShotStatus.js";

export default function getDataFromEnemyHandler(data) {
    const currentEnemyField = {...data.field};
    const currentEvent = data.currentEvent;
    if(currentEvent === 'shipsWasInstalled') {
        gameConstants.enemyShotStatus = data.gameConstants.userShotStatus;
        changeEnemyShipPlacingStatus();
        changeShotStatus();
    }
}