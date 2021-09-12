const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const user = req.currentUserName;
  console.log(user);

  res.render("users", {
    currentUserName: req.currentUserName,
    title: "Users",
    isUsers: true,
  });
});

module.exports = router;
