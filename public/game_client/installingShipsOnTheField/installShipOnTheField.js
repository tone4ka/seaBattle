import { userFieldState, enemyFieldState } from "../fieldsStates.js";
import getFieldCellsForShip from "./getFieldCellsForShip.js";
import getShipDragStartCellData from './getShipDragStartCellData.js';

export default function installShipOnTheField(
  cursorStartCoordinates,
  cursorEndCoordinates,
  shipCells,
  dropFieldCell,
  draggedShip
) {
  const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);

  const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
  if(fieldCellsDataForShip) {
    for(let i = 0; i<fieldCellsDataForShip.length; i += 1) {
      fieldCellsDataForShip[i].shipCell = shipCells[i].cell;
      fieldCellsDataForShip[i].cellNode.style.backgroundColor = 'coral';
      fieldCellsDataForShip[i].cellNode.appendChild(shipCells[i].cell);
      shipCells[i].cell.classList.remove('notInstalledShipCell')
    }
    draggedShip.innerHTML = '';
  };
}
