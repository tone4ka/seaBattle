import installShipOnTheField from "./installingShipsOnTheField/installShipOnTheField.js";
import sendDataToEnemy from "./interactionWithWebsocket/sendDataToEnemy.js";
import { gameConstants } from "./constants.js";
import changeShotStatus from "./interactionWithWebsocket/functions/changeShotStatus.js";
import { userFieldState } from "./constants.js";
import getFieldCellsForShip from "./installingShipsOnTheField/getFieldCellsForShip.js";
import getShipDragStartCellData from './installingShipsOnTheField/getShipDragStartCellData.js';
import playSound from "./playSound.js";

export default function setDragAndDropShipsListeners() {
  const container = document.querySelector(".container");
  let shipCells;
  let cursorStartCoordinates = {};
  let draggedShip;
  let countOfInstalledShips = 0;
  container.addEventListener("dragstart", (event) => {
    cursorStartCoordinates.left = event.clientX;
    cursorStartCoordinates.top = event.clientY;
    draggedShip = event.target;
    shipCells = Array.from(draggedShip.childNodes)
    .filter((item) => item.classList)
    .map((cell) => {
      return {
        cell: cell,
        left: cell.getBoundingClientRect().left,
        top: cell.getBoundingClientRect().top,
        isVertical: cell.parentNode.style.flexDirection == "column",
        numberOfCell: cell.classList[2],
        deckCount: cell.parentNode.classList[1][0],
      };
    })
  });
  container.addEventListener("drop", (event) => {
    const dropFieldCell = event.target;
    const wasTheShipInstalled = installShipOnTheField(
        cursorStartCoordinates,
        shipCells,
        dropFieldCell,
        draggedShip
        );
    if(wasTheShipInstalled) {
      countOfInstalledShips += 1;
      playSound('installShip');
    }
    if (countOfInstalledShips === 10) {
      const userSsipsInstallingStatus = document.querySelector('.userShipPlacingStatus');
      userSsipsInstallingStatus.style.color = 'blue';
      gameConstants.userShipPlacementStatus = true;
      if(!gameConstants.enemyShotStatus) gameConstants.userShotStatus = true;
      changeShotStatus();
      sendDataToEnemy('shipsWasInstalled');
    };
    if (event.target.classList.contains("gameFieldCell")) {
      const dropFieldCell = event.target;
      const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);
      const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
      fieldCellsDataForShip.fieldCellsForShip.forEach(cell => cell.cellNode.style.border = "1px solid rgb(2, 95, 156)");
    }
  });
  container.addEventListener("dragleave", function(event) {
    if (
      !event.target.classList.contains("enemyCell") &&
      (event.target.classList.contains("gameFieldCell") || event.target.classList.contains("shipCell"))
    ) {
      const dropFieldCell = event.target.classList.contains("shipCell") ? event.target.parentElement : event.target;
      const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);
      const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
      fieldCellsDataForShip.fieldCellsForShip.forEach((cell) => {
        if(cell.cellNode.classList.contains("gameFieldCell")){
          cell.cellNode.style.border = "1px solid rgb(2, 95, 156)"
        }
      });
    }
  }, false);
  container.addEventListener("dragover", function(event) {
    if (
      !event.target.classList.contains("enemyCell") &&
      (event.target.classList.contains("gameFieldCell") || event.target.classList.contains("shipCell"))
    ) {
      const dropFieldCell = event.target.classList.contains("shipCell") ? event.target.parentElement : event.target;
      const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);
      const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
      if(fieldCellsDataForShip.validPlace) {
        fieldCellsDataForShip.fieldCellsForShip.forEach((cell) => {
          if(cell.cellNode.classList.contains("gameFieldCell")){
            cell.cellNode.style.border = "3px solid rgb(2, 95, 156, 0.671)";
          }
        });
      } else {
        fieldCellsDataForShip.fieldCellsForShip.forEach((cell) => {
          if(cell.cellNode.classList.contains("gameFieldCell")){
            cell.cellNode.style.border = "3px solid rgb(255, 4, 4, 0.671)";
          }
        });
      }
    }
  }, false);

};
