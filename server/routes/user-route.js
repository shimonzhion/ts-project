const userRouter = require("express").Router();
const { userLogin, userRegister } = require("../controllers/auth-user");


userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter