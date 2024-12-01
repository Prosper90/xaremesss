import { Router } from "express";
import PensionController from "../controllers/PensionController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Route to toggle pension contribution on/off
router.post("/toggle-pension", hasAuth, PensionController.togglePension);

export default router;
