export default function getShipDragStartCellData (shipCells, cursorStartCoordinates) {
    return Array.from(shipCells)
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
    .find((cell) => {
      return (
        cell.left < cursorStartCoordinates.left &&
        cell.left + 30 >
          cursorStartCoordinates.left &&
        cell.top < cursorStartCoordinates.top &&
        cell.top + 30 >
          cursorStartCoordinates.top
      );
    });
}