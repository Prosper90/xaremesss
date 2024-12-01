import { Router } from "express";
import RefController from "../controllers/ReferralController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Destructure the controller
const { LeaderboardRef, UserRef } = RefController;

// Define user-related routes
router.get("/referrals-leaderboard", hasAuth, LeaderboardRef);
router.get("/user-referrals", hasAuth, UserRef);

export default router;
