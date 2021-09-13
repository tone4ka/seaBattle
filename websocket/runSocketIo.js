let io = require("socket.io");
const usersArr = require("../variables/ausersArr");

const connections = [];

function runSocketIo(server) {
  io = io(server);
  io.sockets.on("connection", (socket) => {
    console.log("Seccessful connection");
    console.log('connected users:');
    console.log(usersArr);
    connections.push(socket);

    socket.on("new user", (data) => {
      socket.user = data.name;
      usersArr.push(data.name);
      console.log('new user:');
      console.log(data.name);
      console.log('connected users:');
      console.log(usersArr);
      updateClients();
    });

    socket.on("disconnect", () => {
      // connections.splice(connections.indexOf(socket), 1);
      const userIndex = usersArr.indexOf(socket.user);
      usersArr.splice(userIndex, 1);
      console.log("Disconnected user:");
      console.log(socket.user);
      console.log('connected users:');
      console.log(usersArr);
      updateClients();
    });

    function updateClients() {
      console.log('update Clients with arr:');
      console.log(usersArr);
      io.sockets.emit("update", usersArr);
    }

    socket.on("invite user", (data) => {
      io.sockets.emit("invitation created", {
        text: `it is an invitation for ${data.name}`,
      });
    });
  });
}

module.exports = runSocketIo;
