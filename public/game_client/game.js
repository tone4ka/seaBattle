import shipsTemplate from './templates/shipsTemplate.js';
import createFields from "./createFields.js";
import fieldsBoxTemplate from "./templates/fieldsBoxTemplate.js";
import setDragAndDropShipsListeners from './setDragAndDropShipsListeners.js';
import getDataFromEnemyHandler from './interactionWithWebsocket/getDataFromEnemyHandler.js';
import {gameConstants} from './constants.js';
import changeEnemyShipPlacingStatus from './interactionWithWebsocket/functions/changeEnemyShipPlacingStatus.js';
import changeShotStatus from './interactionWithWebsocket/functions/changeShotStatus.js';
import shot from './interactionWithWebsocket/functions/shot.js';
import playSound from './playSound.js';

const container = document.querySelector(".container");

function startgame() {
  const gameBox = document.querySelector(".gameBox");
  gameBox.innerHTML = "";
  gameBox.insertAdjacentHTML(
    "beforeend",
    fieldsBoxTemplate
  );
  createFields();
  gameBox.insertAdjacentHTML(
    "beforeend",
     shipsTemplate
  );
  if(gameConstants.enemyShipPlacementStatus){
    changeEnemyShipPlacingStatus();
  };
  changeShotStatus();
  setDragAndDropShipsListeners();
};


// обработчики кликов_____________________________________________________________________________________________
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("startGameBtn")) {
    startgame();
  }
  if (event.target.classList.contains("shipCell")) {
    playSound('click');
    const ship = event.target.parentNode;
    ship.style.flexDirection == "column"
      ? (ship.style.flexDirection = "row")
      : (ship.style.flexDirection = "column");
  }
  if (event.target.classList.contains("enemyCell")) {
    if(gameConstants.userShotStatus) shot(event.target);
  }
});
container.addEventListener('newDataFromEnemy', (event) => {
  getDataFromEnemyHandler(event.detail);
});
