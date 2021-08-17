const { Router } = require("express");
const bcrypt = require("bcryptjs"); //для шифрования ключей
const crypto = require("crypto"); // для генерации пароля(при восстановлении пароля)
const User = require("../models/user");
const router = Router();
// const { sendMail, resetPassSendMail } = require("../mailconfig/sendmail");

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
    // loginError: req.flash("loginError"),
    // registerError: req.flash("registerError"),
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const candidate = await User.findOne({ email });

//     if (candidate) {
//       const areSame = await bcrypt.compare(password, candidate.password);
//       if (areSame) {
    const candidate = await User.findById('611bb4c9c01c5751b47b5855');//удалить!!!!!!!!!!!
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
//       } else {
//         req.flash("loginError", "Неверный пароль");
//         res.redirect("/auth/login#login");
//       }
//     } else {
//       req.flash("loginError", "Такого пользователя не существует");
//       res.redirect("/auth/login#login");
//     }
//   } catch (error) {
//     console.log(error);
//   }
});

// router.post("/register", async (req, res) => {
//   try {
//     const { email, password, repeat, name } = req.body;
//     const candidate = await User.findOne({ email });
//     if (candidate) {
//       req.flash("registerError", "Пользователь с таким e-mail уже существует");
//       res.redirect("/auth/login#register");
//     } else {
//       const hashPassword = await bcrypt.hash(
//         password,
//         10 /*<--длина строки для шифрования*/
//       );
//       const user = new User({
//         email,
//         name,
//         password: hashPassword,
//         card: { items: [] },
//       });
//       await user.save();
//       res.redirect("/auth/login#login");
//       console.log(user.email);
//       sendMail(user.email); //подставить потом почту пользователя!!!!!!!
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get("/reset", (req, res) => {
//   return res.render("auth/reset", {
//     tile: "Забыли пароль?",
//     error: req.flash("error"),
//   });
// });

// router.get("/password/:token", async (req, res) => {
//   if (req.params.token) {
//     return res.redirect("/auth/login");
//   }
//   try {
//     const user = await User.findOne({
//       resetToken: req.params.token,
//       resetTokenExp: { $gt: Date.now() }, //сравниваем чтобы время жизни токена было больще, чем текущая дата(короче-он еще действителен?)
//     });
//     if (!user) {
//       return res.redirect("/auth/login");
//     } else {
//       return res.render("auth/password", {
//         tile: "Восстановить доступ?",
//         error: req.flash("error"),
//         UserId: user._id.toString,
//         token: req.params.token,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

// router.post("/reset", (req, res) => {
//   try {
//     crypto.randomBytes(32, async (err, buffer) => {
//       if (err) {
//         req.flash("error", "Что-то пошло не так, повторите попытку позже");
//         res.redirect("/auth/reset");
//       }

//       const token = buffer.toString("hex");
//       const candidate = await User.findOne({ email: req.body.email });

//       if (candidate) {
//         candidate.resetToken = token;
//         candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
//         await candidate.save();
//         resetPassSendMail(candidate.email, token); //подставили почту пользователя!!!!!!!
//         res.redirect("/auth/login");
//       } else {
//         req.flash("error", "Такого email нет");
//         res.redirect("/auth/reset");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/password", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       _id: req.body.userId,
//       resetToken: req.body.token,
//       resetTokenExp: { $gt: Date.now() },
//     });
//     if (user) {
//       user.password = await bcrypt.hash(req.body.password, 10);
//       user.resToken = undefined;
//       user.resetTokenExp = undefined;
//       await user.save();
//       rea.redirect("/auth/password");
//     } else {
//       req.flash("loginError", "Время жизни токена истекло");
//       res.redirect("/auth/login");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

module.exports = router;