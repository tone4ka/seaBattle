import getFieldCellsForShip from "./installingShipsOnTheField/getFieldCellsForShip.js";
import getShipDragStartCellData from './installingShipsOnTheField/getShipDragStartCellData.js';
import { userFieldState } from "./constants.js";

export default function changeCellsBorderColor(color, dropFieldCell, shipCells, cursorStartCoordinates) {
    const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);
    const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
    if(color == 'blueOrRed') color = fieldCellsDataForShip.validPlace ? "3px solid rgb(2, 95, 156, 0.671)" : "3px solid rgb(255, 4, 4, 0.671)";
    fieldCellsDataForShip.fieldCellsForShip.forEach(cell => {
      if(cell.cellNode.classList.contains("gameFieldCell")){
        cell.cellNode.style.border = color;
      }
    });
}