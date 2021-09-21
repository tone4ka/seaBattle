export default function getDataFromEnemyHandler(data) {
    const currentEnemyField = {...data.field};
    const currentEvent = data.currentEvent;
    console.log(currentEvent);
    if(currentEvent === 'shipsWasInstalled') {
        const enemyShipPlacingStatus = document.querySelector('.enemyShipPlacingStatus');
        enemyShipPlacingStatus.innerHTML = '<p align="center">Somewhere here the enemy ships ...</p>';
        enemyShipPlacingStatus.style.color = 'blue';
    }
}