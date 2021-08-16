const express = require('express');
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const usersRoutes = require('./routes/users');
const registrationRoutes = require('./routes/registration');
const homeRoutes = require('./routes/home');
const User = require('./models/user');


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
app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/registration', registrationRoutes);

async function start() {
  try {
    const url = 'mongodb+srv://tonia2:VikpBhS70Tmw3hqP@cluster0.wdbfb.mongodb.net/seabattle?retryWrites=true&w=majority';
    console.log('tonia2:VikpBhS70Tmw3hqP');
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const candidate = await User.findOne(); // без параметров находим есть ли там хотя бы один пользователь(в базе данных)
    if(!candidate) {
      const user = new User({
        email: 'vasia@gmail.com',
        name: 'vasia'
      })
      await user.save();
    }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  } catch (e) {
    console.log(e);
  }
}
    start();


