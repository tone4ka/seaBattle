import * as socket_io from "socket.io";
let io = socket_io;
import usersArr from "../variables/ausersArr.js";

const connections = [];
const playingUsersArr = [];

function runSocketIo(server) {
  io = new io.Server(server);
  io.sockets.on("connection", (socket) => {
    console.log("Seccessful connection");
    console.log("connected users:");
    console.log(usersArr);
    connections.push(socket);

    socket.on("new user", (data) => {
        socket.user = data.name;
        //добавить в массив юзеров инфу с именами пригласивших и статусом игры!!!!!!!!!????????
        console.log("new user:");
        console.log(data.name);
        usersArr.push(data.name);
        console.log("connected users:");
        console.log(usersArr);
        updateClients(null, data.name);
        if(usersArr.filter(name => name == data.name).length > 1){
          console.log("double connect")
          socket.disconnect();
        }
    });

    socket.on("disconnect", () => {
      const userIndex = usersArr.lastIndexOf(socket.user);
      usersArr.splice(userIndex, 1);
      const playingUserIndex = playingUsersArr.lastIndexOf(socket.user);
      playingUsersArr.splice(playingUserIndex, 1);
      console.log("Disconnected user:");
      console.log(socket.user);
      console.log("connected users:");
      console.log(usersArr);
      updateClients(socket.user, null);
    });

    function updateClients(disconnectedUser, connectedUser) {
      console.log("update Clients with arr:");
      console.log(usersArr);
      io.sockets.emit("update", {
        usersArr: usersArr,
        playingUsersArr: playingUsersArr,
        disconnectedUser: disconnectedUser,
        connectedUser: connectedUser,
      });
    }

    socket.on("invite user", (data) => {
      io.sockets.emit("invitation created", {
        text: `it is an invitation for ${data.invitedUserName} from ${data.inviterName}`,
        invitedUserName: data.invitedUserName,
        inviterName: data.inviterName,
      });
    });
    socket.on("start game", (data) => {
      playingUsersArr.push(data.inviterName);
      playingUsersArr.push(data.respondingUserName);
      io.sockets.emit("the game has begun", {
        inviterName: data.inviterName,
        respondingUserName: data.respondingUserName,
      });
    });
    socket.on("dataToEnemy", (data) => {
      io.sockets.emit(`${data.enemyName}`, {
        field: [...data.field],
        currentEvent: data.currentEvent,
        gameConstants: data.gameConstants
      });
    });
  });
}

export default runSocketIo;
