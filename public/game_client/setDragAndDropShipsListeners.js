import installShipOnTheField from "./installingShipsOnTheField/installShipOnTheField.js";
import sendDataToEnemy from "./interactionWithWebsocket/sendDataToEnemy.js";
import { gameConstants } from "./constants.js";
import changeShotStatus from "./interactionWithWebsocket/functions/changeShotStatus.js";

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
    if(wasTheShipInstalled) countOfInstalledShips += 1;
    if (countOfInstalledShips === 10) {
      const userSsipsInstallingStatus = document.querySelector('.userShipPlacingStatus');
      userSsipsInstallingStatus.style.color = 'blue';
      gameConstants.userShipPlacementStatus = true;
      if(!gameConstants.enemyShotStatus) gameConstants.userShotStatus = true;
      changeShotStatus();
      sendDataToEnemy('shipsWasInstalled');
    };
  });
};
