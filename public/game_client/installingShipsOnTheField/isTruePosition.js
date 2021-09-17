import findNeighbors from './findNeighbors.js'

export default function isTruePosition(
  shipDragStartCellData,
  dropFieldCell,
  userFieldState
) {
  const startdragShipCellNumber = +shipDragStartCellData.numberOfCell;
  const deckCount = +shipDragStartCellData.deckCount;
  const row = +dropFieldCell.classList[1];
  const column = +dropFieldCell.classList[2];
  console.log(`deckCount ${deckCount}`);
  // if(!dropFieldCell) return false;

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

  const neighbors = [];
  findNeighbors(row, column, neighbors, userFieldState);

  if (shipDragStartCellData.isVertical) {
    if (startdragShipCellNumber > 1) {
      for (let i = startdragShipCellNumber - 1; i >= 1; i--) {
        findNeighbors(row - (startdragShipCellNumber - i), column, neighbors, userFieldState);
      }
    }
    if (
      startdragShipCellNumber < deckCount
    ) {
      for (
        let i = startdragShipCellNumber + 1;
        i <= deckCount;
        i++
      ) {
        findNeighbors(row + (i - startdragShipCellNumber), column, neighbors, userFieldState);
      }
    }
  } else {
    if (startdragShipCellNumber > 1) {      
      for (let i = startdragShipCellNumber - 1; i >= 1; i--) {
        findNeighbors(row, column - (startdragShipCellNumber - i), neighbors, userFieldState);
      }
    }
    if (startdragShipCellNumber < deckCount) {
      for (
        let i = startdragShipCellNumber + 1;
        i <= deckCount;
        i++
      ) {
        findNeighbors(row, column + (i - startdragShipCellNumber), neighbors, userFieldState);
      }
    }
  }
  console.log('neighbors:');
  
  neighbors.forEach((neighbor) => {
    console.log(neighbor);
    neighbor.cellNode.style.backgroundColor = 'red'
    console.log(neighbor);
  })
  //   console.log(neighbors[0].shipCell);
  //   const isNeighborsShips = neighbors.some((neighbor) => neighbor.shipCell)
  //   if (isNeighborsShips) return false;

  return true;
}
