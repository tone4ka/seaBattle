const express = require('express');
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const usersRoutes = require('./routes/users');
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const MONGODB_URI = 'mongodb+srv://tonia2:VikpBhS70Tmw3hqP@cluster0.wdbfb.mongodb.net/seabattle?retryWrites=true&w=majority';

const {
    allowInsecurePrototypeAccess,
  } = require("@handlebars/allow-prototype-access");
  const app = express();
  const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs", //чтобы каждый раз не писать handlebars
    handlebars: allowInsecurePrototypeAccess(Handlebars), //это чтобы отключить проверку для отображения картинок
  });

app.engine("hbs", hbs.engine); //регистрируем движок
app.set("view engine", "hbs"); //начинаем использовать движок(регистрируем)
app.set("views", "views"); //конфигурируем переменную, где будут храниться наши шаблоны(папка views)
app.use(express.static(path.join(__dirname, "public")));//зарегистрировали папку паблик по умолчанию
app.use(express.urlencoded({ extended: true }));
const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
});
app.use(
  session({
    secret: 'SESSION SECRET',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(varMiddleware);

app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

async function start() {
  try {
    const url = MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  } catch (e) {
    console.log(e);
  }
}
    start();


