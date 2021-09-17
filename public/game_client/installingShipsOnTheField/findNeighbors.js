export default   function findNeighbors(cellRow, cellColumn, neighbors, userFieldState) {
    console.log(`cellRow ${cellRow}`);
    console.log(`cellColumn ${cellColumn}`);
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
  };