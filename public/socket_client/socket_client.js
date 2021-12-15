import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io();

socket.on("connect", () => {
    console.log(socket.id); 
  });
  

//   $(function() {
//     const socket = io.connect();
//     const usersBox = $('.usersBox');
//     let currentEnemyName = 'noEnemy';
//     let currentUserName = $('.currentUserName');
//     currentUserName = currentUserName.text().split(' ')[2];
//     let usersList = [];
//     let playingUsersArr = [];
//     let userInGame = false;

//     const audioMpr = document.createElement('audio');
//     function playClickSound() {
//         audioMpr.src = `../../game_client/assets/sounds/click.mp3`;
//         audioMpr.play();
//         }
    
//     function createUsersList() {
//             usersBox.empty();
//             const myIndex = usersList.indexOf(currentUserName);
//             usersList.splice(myIndex, 1);
//             if(!usersList.length){
//                     usersBox.append(`<p> The sea is calm... The enemy is absent. </p>`);
//             } else {
//                 usersList.forEach((userName) => {
//                     const btn = playingUsersArr.includes(userName) ? `<button class="btn btnSocket inaccessibleInviteBtn ${userName}">User in battle</button>` :
//                     `<button class="btn btnSocket btn-blue inviteBtn ${userName}">Invite to the game</button>`;
//                     usersBox.append(`
//                     <div class="userBox ${userName}Box">
//                     <p> ${userName} </p>
//                     ${btn}
//                     </div>
//                     `);
//                 });
//             }
//     };

//     socket.on("connect", () => {
//         socket.emit('new user', {name: currentUserName});
//     });

//     socket.on("disconnect", () => {
//         $('h4').empty();
//         $('h4').append(`...This account already is online. Sign out on other devices.`);
//         usersBox.empty();
//     });

//     socket.on('update', (data) => {
//         const oldUserList = [...usersList];
//         usersList = [...data.usersArr];
//         playingUsersArr = [...data.playingUsersArr];
//         if(data.connectedUser == currentUserName){
//             if(usersList.filter(name => name == currentUserName).length == 1) createUsersList();
//         } else if(data.disconnectedUser){
//             if (data.disconnectedUser == currentEnemyName) {
//                 setTimeout(() => {
//                     $('h4').empty();
//                     $('h4').append(`And on the vastness of the horizon...`);
//                     usersBox.empty();
//                     currentEnemyName = 'noEnemy';
//                     usersBox.append(`
//                         <div class="enemyCapitulated">
//                             <h5>Your opponent has surrendered!<h5>
//                             <button class="btn btnSocket acceptSurrenderBtn">Accept surrender</button>
//                         </div>
//                     `);
//                 }, 1000);
//             } else {
//               if(!userInGame) {
//                   const disconnectUserBox = document.querySelectorAll(`.${data.disconnectedUser}Box`);
//                   disconnectUserBox[disconnectUserBox.length-1].remove();
//                   if(usersList.length <= 1) {
//                     usersBox.append(`<p> The sea is calm... The enemy is absent. </p>`);
//                   }
//               }
//             }
//         } else if(!userInGame) {
//             if(oldUserList.length <= 1) usersBox.empty();
//             usersBox.append(`
//                 <div class="userBox ${data.connectedUser}Box">
//                 <p> ${data.connectedUser} </p>
//                 <button class="btn btnSocket btn-blue inviteBtn ${data.connectedUser}">Invite to the game</button>
//                 </div>
//                 `);
//         }
//     });

//     usersBox.click((event) => {
//         if(event.target.classList.contains('btnSocket')){
//             playClickSound();
//             const currentBtn = event.target;
//             const enemyName = Array.from(currentBtn.classList).slice(-1)[0];
//             const enemyBox = $(`.${enemyName}Box`);
//             if(event.target.classList.contains('inviteBtn')){
//                 currentBtn.remove();
//                 enemyBox.append(`
//                         <button class="btn btnSocket inaccessibleInviteBtn ${enemyName}">User was invited</button>
//                         `);
//                 socket.emit("invite user", {invitedUserName: enemyName, inviterName: currentUserName});
//             };
//             if(event.target.classList.contains('invitationUnswerBtn')){
//                 usersBox.empty();
//                 usersBox.append('<p>loading....................</p>');
//                 socket.emit("start game", {respondingUserName: currentUserName, inviterName: enemyName});
//             };
//             if(event.target.classList.contains('acceptSurrenderBtn')){
//                  document.location.reload();
//              };
//         };
//     });

//     socket.on('invitation created', (data) => {
//         if(data.inviterName != currentUserName && data.invitedUserName == currentUserName){
//             let inviterBox = $(`.${data.inviterName}Box`);
//             let inviterBtn = $(`.${data.inviterName}`);
//             inviterBox.empty();
//             inviterBox.append(`
//                     <p> ${data.inviterName} </p>
//                     <button class="btn btnSocket invitationUnswerBtn ${data.inviterName}">Take the fight?</button>
//                     `);
           
//         }
//     });

//     socket.on('the game has begun', (data) => {
//         if(data.inviterName == currentUserName || data.respondingUserName == currentUserName){
//             currentEnemyName = data.inviterName == currentUserName ? data.respondingUserName : data.inviterName;
//             userInGame = true;
//             usersBox.empty();
//             usersBox.append(`
//             <div class="gameBox">
//             <button class="btn btnSocket btn-blue startGameBtn ${currentEnemyName}">Start game</button>
//             </div>
//             `);
//         } else {
//             const inviterBox  = $(`.${data.inviterName}Box`);
//             const responderBox =  $(`.${data.respondingUserName}Box`);
//             const inviterBtn  = $(`.${data.inviterName}`);
//             const responderBtn =  $(`.${data.respondingUserName}`);
//             inviterBtn.remove();
//             responderBtn.remove();
//             inviterBox.append(`
//                     <button class="btn btnSocket inaccessibleInviteBtn ${data.inviterName}">User in battle</button>
//                     `);
//             responderBox.append(`
//                     <button class="btn btnSocket inaccessibleInviteBtn ${data.respondingUserName}">User in battle</button>
//                     `);
//         }
//     });

//     socket.on(`${currentUserName}`, (data) => {
//          const newDataFromEnemy = new Event('newDataFromEnemy');
//              newDataFromEnemy.detail = {
//                     field: [...data.field],
//                     currentEvent: data.currentEvent,
//                     gameConstants: data.gameConstants
//                 };
//          const container = document.querySelector('.container');
//          container.dispatchEvent(newDataFromEnemy);
//     });

//     $('.container').bind('sendDataToEnemy', (event) => {
//          socket.emit(`dataToEnemy`, {
//              enemyName: currentEnemyName,
//              currentEvent:  event.detail.currentEvent,
//              field: event.detail.field,
//              gameConstants: event.detail.gameConstants
//              });
//     })
// });