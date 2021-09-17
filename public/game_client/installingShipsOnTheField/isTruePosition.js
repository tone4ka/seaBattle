export default function isTruePosition(
  shipDragStartCellData,
  dropFieldCell,
  userFieldState
) {
    console.log(shipDragStartCellData.deckCount)
    console.log(shipDragStartCellData.deckCount)
  // if(!dropFieldCell) return false;
  const row = +dropFieldCell.classList[1];
  const column = +dropFieldCell.classList[2];

  if (
    dropFieldCell.shipCell ||
    dropFieldCell.classList.contains("gameFieldTitleCell")
  )
    return false;

  if (shipDragStartCellData.isVertical) {
    if (
      +shipDragStartCellData.numberOfCell > row ||
      +shipDragStartCellData.deckCount -
        +shipDragStartCellData.numberOfCell +
        row >
        10
    )
      return false;
  } else {
    if (
      +shipDragStartCellData.numberOfCell > column ||
      +shipDragStartCellData.deckCount -
        +shipDragStartCellData.numberOfCell +
        column >
        10
    )
      return false;
  }
  const neighbors = [];
  function findNeighbors(cellRow, cellColumn) {
    console.log(cellRow);
    console.log(cellColumn);
    if (cellRow > 1) neighbors.push(userFieldState[cellRow - 1][cellColumn]);
    if (cellRow < 10) neighbors.push(userFieldState[cellRow + 1][cellColumn]);
    if (cellColumn > 1) neighbors.push(userFieldState[cellRow][cellColumn - 1]);
    if (cellColumn < 10)
      neighbors.push(userFieldState[cellRow][cellColumn + 1]);
    if (cellRow > 1 && cellColumn > 1)
      neighbors.push(userFieldState[cellRow - 1][cellColumn - 1]);
    if (cellRow > 1 && cellColumn < 10)
      neighbors.push(userFieldState[cellRow - 1][cellColumn + 1]);
    if (cellRow < 10 && cellColumn > 1)
      neighbors.push(userFieldState[cellRow + 1][cellColumn - 1]);
    if (cellRow < 10 && cellColumn < 10)
      neighbors.push(userFieldState[cellRow + 1][cellColumn + 1]);
  }
  findNeighbors(row, column);
  if (shipDragStartCellData.isVertical) {
    if (+shipDragStartCellData.numberOfCell > 1) {
      for (let i = +shipDragStartCellData.numberOfCell - 1; i >= 1; i--) {
        console.log(i);
        findNeighbors(row - i, column);
      }
    }
    if (
      +shipDragStartCellData.numberOfCell < +shipDragStartCellData.deckCount
    ) {
      for (
        let i = +shipDragStartCellData.numberOfCell + 1;
        i <= +shipDragStartCellData.deckCount;
        i++
      ) {
        console.log(i);
        findNeighbors(row + i, column);
      }
    }
  } else {
    if (+shipDragStartCellData.numberOfCell > 1) {
      for (let i = +shipDragStartCellData.numberOfCell - 1; i >= 1; i--) {
        findNeighbors(row, column - i);
      }
    }
    if (
      +shipDragStartCellData.numberOfCell < +shipDragStartCellData.deckCount
    ) {
      for (
        let i = +shipDragStartCellData.numberOfCell + 1;
        i <= +shipDragStartCellData.deckCount;
        i++
      ) {
        findNeighbors(row, column + i);
      }
    }
  }

  console.log(neighbors);
  //   console.log(neighbors[0].shipCell);
  //   const isNeighborsShips = neighbors.some((neighbor) => neighbor.shipCell)
  //   if (isNeighborsShips) return false;

  return true;
}
