import express from "express";
import UserController from "./controller/authenticationController";

const router = express.Router();

router.post("/login", UserController.login);

router.post("/private", UserController.private);

export default router;
