import findNeighbors from './findNeighbors.js'

export default function getFieldCellsForShip(
  shipDragStartCellData,
  dropFieldCell,
  userFieldState
) {
  if(!shipDragStartCellData) return false;
  if(!dropFieldCell.classList.contains('cell')) return false;

  const fieldCellsForShip = [];
  const startdragShipCellNumber = +shipDragStartCellData.numberOfCell;
  const deckCount = +shipDragStartCellData.deckCount;
  const row = +dropFieldCell.classList[1];
  const column = +dropFieldCell.classList[2];
  const {isVertical} = shipDragStartCellData

  if(startdragShipCellNumber != 1) return false;

  if (
    dropFieldCell.shipCell ||
    dropFieldCell.classList.contains("gameFieldTitleCell")
  )
    return false;

  if (shipDragStartCellData.isVertical) {
    if (
      startdragShipCellNumber > row ||
      deckCount - startdragShipCellNumber + row > 10
    )
      return false;
  } else {
    if (
      startdragShipCellNumber > column ||
      deckCount - startdragShipCellNumber + column > 10
    )
      return false;
  };

  let neighbors = [];
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
      fieldCellsForShip.push(userFieldState[currentRow][currentColumn]);
      neighbors = neighbors.concat(findNeighbors(currentRow, currentColumn, userFieldState));
    }
  }

  const isNeighborsShips = neighbors.some((neighbor) => neighbor.shipCell)
  if (isNeighborsShips) return false;

  return fieldCellsForShip;
}
