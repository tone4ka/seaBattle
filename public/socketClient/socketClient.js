import { io } from "socket.io-client";
import startgame from "../game_client/game";

    const socket = io();
    const usersBox = document.querySelector('.usersBox');
    const container = document.querySelector('.container');
    let currentEnemyName = 'noEnemy';
    let currentUserName = document.querySelector('.currentUserName');
    currentUserName = currentUserName.text().split(' ')[2];
    let usersList = [];
    let userInGame = false;
    
    function createUsersList() {
            usersBox.innerHTML = '';
            const myIndex = usersList.indexOf(currentUserName);
            usersList.splice(myIndex, 1);
            if(!usersList.length){
                    usersBox.insertAdjacentHTML(
                        "beforeend",`<p> The sea is calm... The enemy is absent. </p>`);
            } else {
                usersList.forEach((userName) => {
                    usersBox.insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="userBox ${userName}Box">
                        <p> ${userName} </p>
                        <button class="btn btn-blue inviteBtn ${userName}">Invite to the game</button>
                        </div>
                    `);
                });
            }
    };

    socket.on("connect", () => {
        console.log("clients connection:");
        console.log(currentUserName);
        socket.emit('new user', {name: currentUserName});
    });
    socket.on('update', (data) => {
        usersList = [...data.usersArr];
        if(data.connectedUser == currentUserName){
            createUsersList();
        } else if(data.disconnectedUser){
            if (data.disconnectedUser == currentEnemyName) {
                usersBox.innerHTML = '';
                currentEnemyName = 'noEnemy';
                usersBox.insertAdjacentHTML(
                    "beforeend",
                    `<div class="enemyCapitulated">
                        <h5>Your opponent has surrendered!<h5>
                        <button class="btn acceptSurrenderBtn">Accept surrender</button>
                    </div>
                `);
            } else {
                const disconnectedUser = document.querySelector(`.${data.disconnectedUser}Box`)
              if(!userInGame) disconnectedUser.parentNode.removeChild(disconnectedUser);
 
            }
        } else if(!userInGame) {
            usersBox.insertAdjacentHTML(
                "beforeend",`
                <div class="userBox ${data.connectedUser}Box">
                <p> ${data.connectedUser} </p>
                <button class="btn btn-blue inviteBtn ${data.connectedUser}">Invite to the game</button>
                </div>
                `);
        } else { console.log('............clients socket updation error................') }
    });
    usersBox.addEventListener('click',(event) => {
        if(event.target.classList.contains('btn')){
            const currentBtn = event.target;
            const enemyName = Array.from(currentBtn.classList).slice(-1)[0];
            const enemyBox = document.querySelector(`.${enemyName}Box`);
            if(event.target.classList.contains('inviteBtn')){
                currentBtn.parentNode.removeChild(currentBtn);
                enemyBox.insertAdjacentHTML(
                    "beforeend",`
                        <button class="btn inaccessibleInviteBtn ${enemyName}">User was invited</button>
                        `);
                socket.emit("invite user", {invitedUserName: enemyName, inviterName: currentUserName});
            };
            if(event.target.classList.contains('invitationUnswerBtn')){
                usersBox.innerHTML = '';
                usersBox.insertAdjacentHTML(
                    "beforeend",
                    '<p>loading....................</p>'
                    );
                socket.emit("start game", {respondingUserName: currentUserName, inviterName: enemyName});
            };
            if(event.target.classList.contains('acceptSurrenderBtn')){
                 userInGame = false;
                 socket.emit('userLeftTheGame', {name: currentUserName});
                 createUsersList();
             };
        };
    });
    socket.on('invitation created', (data) => {
        if(data.inviterName != currentUserName && data.invitedUserName == currentUserName){
            let inviterBox = document.querySelector(`.${data.inviterName}Box`);
            inviterBox.parentNode.removeChild(inviterBox);
            inviterBox.insertAdjacentHTML(
                    "beforeend",`
                    <p> ${data.inviterName} </p>
                    <button class="btn invitationUnswerBtn ${data.inviterName}">Take the fight?</button>
                    `);
           
        }
    });
    socket.on('the game has begun', (data) => {
        if(data.inviterName == currentUserName || data.respondingUserName == currentUserName){
            userInGame = true;
            usersBox.innerHTML = '';
            usersBox.insertAdjacentHTML(
                "beforeend",`
                <div class="gameBox">
                <button class="btn btn-blue startGameBtn ${currentEnemyName}">Start game</button>
                </div>
                `);
            const gameBox = document.querySelector('.gameBox');
            socket.emit(`dataToEnemy`, {enemyName: currentEnemyName, field: [[0, 0], [1, 1], [2, 2], [3, 3]]});
            gameBox.addEventListener('click', () => {
                currentEnemyName = data.inviterName == currentUserName ? data.respondingUserName : data.inviterName;
                socket.emit(`dataToEnemy`, {enemyName: currentEnemyName, field: [[0, 0], [1, 1], [2, 2], [3, 3]]});
            });
        } else {
            const inviterBtn  = document.querySelector(`.${data.inviterName}`);
            const responderBtn =  document.querySelector(`.${data.respondingUserName}`);
            inviterBtn.parentNode.removeChild(inviterBtn);
            responderBtn.parentNode.removeChild(responderBtn);
            const inviterBox  = document.querySelector(`.${data.inviterName}Box`);
            const responderBox =  document.querySelector(`.${data.respondingUserName}Box`);
            inviterBox.insertAdjacentHTML(
                    "beforeend",`
                    <button class="btn inaccessibleInviteBtn ${data.inviterName}">User in battle</button>
                    `);
            responderBox.insertAdjacentHTML(
                    "beforeend",`
                    <button class="btn inaccessibleInviteBtn ${data.respondingUserName}">User in battle</button>
                    `);
        }
    });
    socket.on(`${currentUserName}`, (data) => {
        const currentGameBox = $('.gameBox');
        const field = `||${data.field.map((string) => string.join('-')).join('||')}||`;
        console.log(`Your opponent clicked on the field and sent the state of the field: ${field}`);

    });
    container.addEventListener('sendReadyForGameStatusToEnemyEvent', (event) => {
        console.log(event.userFieldState);
        // socket.emit(`dataToEnemy`, {enemyName: currentEnemyName, field: [[0, 0], [1, 1], [2, 2], [3, 3]]});
    });



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
