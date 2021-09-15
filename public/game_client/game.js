const container = document.querySelector(".container");
const userFieldState = [
  [
    { text: "" },
    { text: 1 },
    { text: 2 },
    { text: 3 },
    { text: 4 },
    { text: 5 },
    { text: 6 },
    { text: 7 },
    { text: 8 },
    { text: 9 },
    { text: 10 },
  ],
  [
    { text: "a" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "b" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "c" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "d" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "e" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "f" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "g" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "h" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "i" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "j" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
];
const enemyFieldState = [
  [
    { text: "" },
    { text: 1 },
    { text: 2 },
    { text: 3 },
    { text: 4 },
    { text: 5 },
    { text: 6 },
    { text: 7 },
    { text: 8 },
    { text: 9 },
    { text: 10 },
  ],
  [
    { text: "a" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "b" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "c" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "d" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "e" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "f" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "g" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "h" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "i" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  [
    { text: "j" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ],
];
let userShipsInstalled = false;
let enemyShipsInstalled = false;

function startgame() {
  const gameBox = document.querySelector(".gameBox");
  gameBox.innerHTML = "";
  gameBox.insertAdjacentHTML(
    "beforeend",
    `
    <div class="fieldsBox">
      <div ondragover="event.preventDefault()" dragenter="event.preventDefault()" class="userFieldBox"><p align="center">Our ships</p></div>
      <div class="enemyFieldBox"><p align="center">Somewhere here the enemy ships ...</p></div>
    </div>
    `
  );
  const enemyFieldBox = document.querySelector(".enemyFieldBox");
  const userFieldBox = document.querySelector(".userFieldBox");
  for (i = 0; i <= 10; i++) {
    const currentUserRow = document.createElement("div");
    currentUserRow.classList.add("userFieldRow", `${i}`);
    const currentEnemyRow = document.createElement("div");
    currentEnemyRow.classList.add("enemyFieldRow", `${i}`);
    enemyFieldBox.appendChild(currentEnemyRow);
    userFieldBox.appendChild(currentUserRow);
    for (j = 0; j <= 10; j++) {
      currentUserRow.insertAdjacentHTML(
        "beforeend",
        `
          <div class="cell ${i} ${j} ${
          i == 0 || j == 0 ? "" : "gameFieldCell"
        }">
              ${userFieldState[i][j].text}
          </div>
      `
      );
      currentEnemyRow.insertAdjacentHTML(
        "beforeend",
        `
          <div class="cell ${i} ${j} ${
          i == 0 || j == 0 ? "" : "gameFieldCell"
        }">
              ${enemyFieldState[i][j].text}
          </div>
      `
      );
    }
  }
  gameBox.insertAdjacentHTML(
    "beforeend",
    `
    <div class="shipsBox">

        <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 4deckShip">
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
        </div>

        <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 3deckShip">
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
        </div>

        <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 3deckShip">
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
        </div>

        <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 2deckShip">
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
        </div>

        <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 2deckShip">
          <div class="shipCell notInstalledShipCell">
          </div>
          <div class="shipCell notInstalledShipCell">
          </div>
        </div>

      <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 2deckShip">
        <div class="shipCell notInstalledShipCell">
        </div>
        <div class="shipCell notInstalledShipCell">
        </div>
      </div>
      
      <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 1deckShip">
        <div class="shipCell notInstalledShipCell">
        </div>
      </div>

      <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 1deckShip">
        <div class="shipCell notInstalledShipCell">
        </div>
      </div>

      <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 1deckShip">
        <div class="shipCell notInstalledShipCell">
        </div>
      </div>

      <div draggable="true" event.dataTransfer.effectAllowed = "move" class="ship 1deckShip">
        <div class="shipCell notInstalledShipCell">
        </div>
      </div>

  </div>
    `
  );

  //обработчики drag and drop________________________________________________________________________________________
  let shipCells;
  container.addEventListener("dragend", (event) => {
    const draggedShip = event.target;
    const shipCells = draggedShip.childNodes;
    const shipCellsCoordinates = Array.from(shipCells)
      .filter((item) => item.classList)
      .map((cell) => {
        // return window.getComputedStyle(cell).x.slice(0, -2);
        return cell.getBoundingClientRect().left;
      });
    console.log(shipCellsCoordinates);
  });
  container.addEventListener("drop", (event) => {
    console.log(event.target);
    // window.getComputedStyle(card).height.slice(0, -2)
  });
}

// обработчики кликов_____________________________________________________________________________________________
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("startGameBtn")) {
    startgame();
  }
  if (event.target.classList.contains("shipCell")) {
    const ship = event.target.parentNode;
    ship.style.flexDirection == "column"
      ? (ship.style.flexDirection = "row")
      : (ship.style.flexDirection = "column");
  }
});
