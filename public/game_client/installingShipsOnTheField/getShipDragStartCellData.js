export default function getShipDragStartCellData (shipCells, cursorStartCoordinates) {
    return shipCells.find((cell) => {
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