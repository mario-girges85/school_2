const express = require("express");
const userRouter = express.Router();
const usersController = require("../controllers/users.js");

userRouter.get("/new", usersController.newuser);
userRouter.get("/:id", usersController.userprofile);
userRouter.get("/edit/:id", usersController.edit);
userRouter.get("/delete/:id", usersController.delete);

module.exports = userRouter;
