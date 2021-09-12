const usersArr = require("../variables/ausersArr");

module.exports = function (req, res, next) {
  req.usersArr = usersArr;
  req.currentUserName = req.session.user.name;
  next();
};
