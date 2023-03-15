import express from "express";
import UserController from "../contoller/userController";

const user = express.Router();

user.post("/addUser", UserController.userController);
user.post("/loginUser", UserController.loginController);

export default user;
