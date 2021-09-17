import { userFieldState } from "./fieldsStates.js";
import installShipOnTheField from "./installingShipsOnTheField/installShipOnTheField.js";

export default function setDragAndDropShipsListeners() {
  const container = document.querySelector(".container");
  let shipCells;
  let cursorStartCoordinates = {};
  let cursorEndCoordinates = {};
  let draggedShip;
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
  container.addEventListener("dragend", (event) => {
    cursorEndCoordinates.left = event.clientX;
    cursorEndCoordinates.top = event.clientY;
  });
  container.addEventListener("drop", (event) => {
    const dropFieldCell = event.target;
    installShipOnTheField(
        cursorStartCoordinates,
        cursorEndCoordinates,
        shipCells,
        dropFieldCell,
        draggedShip
        );
  });
};
