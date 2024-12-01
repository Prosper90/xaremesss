import { Router } from "express";
import DailyGemaController from "../controllers/dailyGemaController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Route to claim daily gema reward
router.post("/claim", hasAuth, DailyGemaController.claimReward);
router.get("/daily-gema-status", hasAuth, DailyGemaController.getDailyGemaStatus);

export default router;
