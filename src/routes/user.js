import { Router } from "express";
import UserController from "../../src/controllers/UserController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

// Destructure the controller

// Define user-related routes
// router.get("/user-all-details", hasAuth, UserController.getUserAllDetails);
router.get("/card-details", hasAuth, UserController.getUserCardDetails);
router.get("/details", hasAuth, UserController.getUserDetails);
router.get("/scores", hasAuth, UserController.getUserScores);

export default router;
