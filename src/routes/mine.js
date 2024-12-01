import { Router } from "express";
import MineController from "../controllers/MineController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Destructure the controller
const { MineHistory, Particular, MineUrl } = MineController;

// Define user-related routes
router.get("/get-mine-history", hasAuth, MineHistory);
router.get("/get-particular-mined/:id", hasAuth, Particular);
router.post("/mine-url", hasAuth, MineUrl);

export default router;
