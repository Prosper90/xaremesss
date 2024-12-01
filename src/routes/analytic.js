import { Router } from "express";
import AnalyticsController from "../controllers/AnalyticController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Route to get analytics data for a user (including rank, refill speed, pension)
router.get("/analytics", hasAuth, AnalyticsController.getAnalytics);

export default router;
