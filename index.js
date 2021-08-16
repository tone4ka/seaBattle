const express = require('express');
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require('path');
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
    res.render('index', {
      title: 'Home page',
      isHome: true
    });
})
app.get('/registration', (req, res) => {
    res.render('registration', {
      title: 'Registration',
      isRegistration: true
    });
})
app.get('/users', (req, res) => {
    res.render('users', {
      title: 'Users',
      isUsers: true
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });