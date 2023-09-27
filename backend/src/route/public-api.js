import express from "express";
import userController from "../controller/user-controller.js";

const publicApi = express.Router();

publicApi.post("/api/auth/register", userController.register);
publicApi.post("/api/auth/login", userController.login);

export default publicApi;
