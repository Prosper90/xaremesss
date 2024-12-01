import { Router } from "express";
import DailyClaimsController from "../controllers/DailyClaimsController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();


// Route to toggle pension contribution on/off
router.get("/daily-claims", hasAuth, DailyClaimsController.getUserDailyClaims);

// Route to toggle pension contribution on/off
router.patch("/daily-claims", hasAuth, DailyClaimsController.updateUserDailyClaims);

export default router;
