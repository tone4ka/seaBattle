import express from "express";
const Router = express;
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

export default router;
