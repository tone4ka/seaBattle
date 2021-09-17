import { userFieldState } from "./fieldsStates.js";
import installShipOnTheField from "./installingShipsOnTheField/installShipOnTheField.js";

export default function dragAndDropShipsHandler() {
  const container = document.querySelector(".container");
  let shipCells;
  let cursorStartCoordinates = {};
  let cursorEndCoordinates = {};
  container.addEventListener("dragstart", (event) => {
    cursorStartCoordinates.left = event.clientX;
    cursorStartCoordinates.top = event.clientY;
    const draggedShip = event.target;
    shipCells = draggedShip.childNodes;
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
        dropFieldCell
        );
  });
}

// return window.getComputedStyle(cell).x.slice(0, -2);
