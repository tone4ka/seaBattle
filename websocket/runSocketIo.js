import * as socket_io from "socket.io";
let io = socket_io;
import usersArr from "../variables/ausersArr.js";

const connections = [];

function runSocketIo(server) {
  io = new io.Server(server);
  io.sockets.on("connection", (socket) => {
    console.log("Seccessful connection");
    console.log("connected users:");
    console.log(usersArr);
    connections.push(socket);

    socket.on("new user", (data) => {
      socket.user = data.name;
      usersArr.push(data.name);
      console.log("new user:");
      console.log(data.name);
      console.log("connected users:");
      console.log(usersArr);
      updateClients(null, data.name);
    });

    socket.on("disconnect", () => {
      const userIndex = usersArr.indexOf(socket.user);
      usersArr.splice(userIndex, 1);
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
