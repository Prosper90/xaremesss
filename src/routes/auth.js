import { Router } from "express";
import AuthController from "../../src/controllers/AuthController.js";
import hasAuth from "../middlewares/hasAuth.js";

const router = Router();

const { authenticateUser, linkTwitter, linkTonWallet } = AuthController;

// Define user-related routes
router.post("/authenticate", authenticateUser);
router.post("/link-twitter", hasAuth, linkTwitter);
router.post("/link-ton-wallet", hasAuth, linkTonWallet);

export default router;
