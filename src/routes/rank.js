import { Router } from "express";
import { hasAuth } from '../middlewares/hasAuth.js'
import RankController from "../controllers/RankController.js";

const router = Router();

// Destructure the controller

// Define rank-related routes
router.get('/color', hasAuth, RankController.getUserRankColor)
export default router;
