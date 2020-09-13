import express from "express";
import { AuthController } from "../Controllers";

// root api: /auth
const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/checkUsername", AuthController.checkUsername);


export default router;
