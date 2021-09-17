import { userFieldState, enemyFieldState } from "../fieldsStates.js";
import getFieldCellsForShip from "./getFieldCellsForShip.js";
import getShipDragStartCellData from './getShipDragStartCellData.js';

export default function installShipOnTheField(
  cursorStartCoordinates,
  cursorEndCoordinates,
  shipCells,
  dropFieldCell
) {
  const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);

  const fieldCellsForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
  if(fieldCellsForShip) {
    fieldCellsForShip.forEach((fieldCell) => {
      fieldCell.cellNode.style.backgroundColor = 'blue';
      //добавить свойство fieldCell.shipCell, в котором лежит нод клетки кораблика!!!Ы
    });
  };
}
