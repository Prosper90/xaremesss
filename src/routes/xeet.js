import { Router } from "express";
import XeetController from "../controllers/XeetController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

router.get(
  "/:userId/fetch-all-xeets",
  hasAuth,
  XeetController.fetchAllXeetsByUser
);
router.post("/:userId/mint", hasAuth, XeetController.mintXeetScore);

export default router;
