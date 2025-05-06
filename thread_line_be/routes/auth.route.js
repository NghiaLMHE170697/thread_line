const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/verify-email", authController.verifyEmail);

module.exports = authRouter;
