const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash"); //для передачи данных через сессию
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const keys = require("./keys"); //сюда вынесли переменные
const varMiddleware = require("./middleware/variables");
const usersMiddleware = require("./middleware/usersArr");
const usersArr = require("./variables/ausersArr");
const app = express();
let io = require("socket.io"); //!!!!!!!!!!!!

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
// const server = require("http").createServer(app); //!!!!!!!!!!!!
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs", //чтобы каждый раз не писать handlebars
  handlebars: allowInsecurePrototypeAccess(Handlebars), //это чтобы отключить проверку для отображения картинок
});
app.engine("hbs", hbs.engine); //регистрируем движок
app.set("view engine", "hbs"); //начинаем использовать движок(регистрируем)
app.set("views", "views"); //конфигурируем переменную, где будут храниться наши шаблоны(папка views)
app.use(express.static(path.join(__dirname, "public"))); //зарегистрировали папку паблик по умолчанию
app.use(express.urlencoded({ extended: true }));
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(usersMiddleware);
app.use("/", homeRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

const connections = [];

async function start() {
  try {
    const url = keys.MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    io = io(server);
    io.sockets.on("connection", (socket) => {
      console.log("Seccessful connection");
      connections.push(socket);

      socket.on("disconnect", (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnect");
      });
      socket.on("invite user", (data) => {
        io.sockets.emit("send an invitation", {
          text: `it is an invitation for ${data}`,
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
}
start();
