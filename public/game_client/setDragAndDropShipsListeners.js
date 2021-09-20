import { userFieldState } from "./fieldsStates.js";
import installShipOnTheField from "./installingShipsOnTheField/installShipOnTheField.js";
import sendReadyForGameStatusToEnemy from "./interactionWithWebsocket/sendReadyForGameStatusToEnemy.js";

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
    if (countOfInstalledShips === 10) sendReadyForGameStatusToEnemy();
  });
};
