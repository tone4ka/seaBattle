const usersArr = require("../variables/ausersArr");

module.exports = function (req, res, next) {
  const currentUserName = req.session.user ? req.session.user.name : "unknown";
  req.usersArr = usersArr;
  req.currentUserName = currentUserName;
  next();
};
