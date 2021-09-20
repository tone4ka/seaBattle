import { userFieldState } from "../fieldsStates.js";

export default function sendReadyForGameStatusToEnemy() {
    const sendReadyForGameStatusToEnemyEvent = new Event('sendReadyForGameStatusToEnemyEvent');
    sendReadyForGameStatusToEnemyEvent.detail = userFieldState;
    const container = document.querySelector('.container');
    container.dispatchEvent(sendReadyForGameStatusToEnemyEvent);
}