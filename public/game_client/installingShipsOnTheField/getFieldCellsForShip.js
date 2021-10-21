import findNeighbors from './findNeighbors.js'

export default function getFieldCellsForShip(
  shipDragStartCellData,
  dropFieldCell,
  userFieldState
) {
  let validPlace = true;
  if(!shipDragStartCellData) validPlace = false;
  if(!dropFieldCell.classList.contains('cell')) validPlace = false;

  const fieldCellsForShip = [];
  const startdragShipCellNumber = +shipDragStartCellData.numberOfCell;
  const deckCount = +shipDragStartCellData.deckCount;
  const row = +dropFieldCell.classList[1];
  const column = +dropFieldCell.classList[2];
  const {isVertical} = shipDragStartCellData

  if(startdragShipCellNumber != 1) validPlace = false;

  if (
    dropFieldCell.shipCell ||
    dropFieldCell.classList.contains("gameFieldTitleCell")
  )
  validPlace = false;

  if (shipDragStartCellData.isVertical) {
    if (
      startdragShipCellNumber > row ||
      deckCount - startdragShipCellNumber + row > 10
    )
    validPlace = false;
  } else {
    if (
      startdragShipCellNumber > column ||
      deckCount - startdragShipCellNumber + column > 10
    )
    validPlace = false;
  };

  let neighbors = [];
  if(userFieldState[row]){
    if(userFieldState[row][column]){
      fieldCellsForShip.push(userFieldState[row][column]);
      neighbors = neighbors.concat(findNeighbors(row, column, userFieldState));
      if (startdragShipCellNumber < deckCount) {
        for (
          let i = startdragShipCellNumber + 1;
          i <= deckCount;
          i++
        ) {
          const currentRow = isVertical ? row + (i - startdragShipCellNumber) : row;
          const currentColumn = isVertical ? column : column + (i - startdragShipCellNumber);
          if(userFieldState[currentRow]){
            if(userFieldState[currentRow][currentColumn]){
              fieldCellsForShip.push(userFieldState[currentRow][currentColumn]);
              neighbors = neighbors.concat(findNeighbors(currentRow, currentColumn, userFieldState));
            }
          }
        }
      }

    }
  }




  const isNeighborsShips = neighbors.some((neighbor) => neighbor.shipCell)
  if (isNeighborsShips) validPlace = false;

  return {
    fieldCellsForShip: fieldCellsForShip,
    validPlace: validPlace
  };
}
