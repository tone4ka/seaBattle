import { userFieldState } from "../fieldsStates.js";

export default function sendDataToEnemy(event) {
    const sendDataToEnemy = new Event('sendDataToEnemy');
    sendDataToEnemy.detail = {
        field: [...userFieldState],
        currentEvent: event
    };
    const container = document.querySelector('.container');
    container.dispatchEvent(sendDataToEnemy);
}