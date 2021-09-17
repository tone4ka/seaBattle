import shipsTemplate from './templates/shipsTemplate.js';
import createFields from "./createFields.js";
import fieldsBoxTemplate from "./templates/fieldsBoxTemplate.js";
import dragAndDropShipsHandler from './dragAndDropShipsHandler.js';

const container = document.querySelector(".container");
let userShipsInstalled = false;
let enemyShipsInstalled = false;

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
  dragAndDropShipsHandler();
};


// обработчики кликов_____________________________________________________________________________________________
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("startGameBtn")) {
    startgame();
  }
  if (event.target.classList.contains("shipCell")) {
    const ship = event.target.parentNode;
    ship.style.flexDirection == "column"
      ? (ship.style.flexDirection = "row")
      : (ship.style.flexDirection = "column");
  }
});
