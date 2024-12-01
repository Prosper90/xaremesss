import { Router } from "express";
import ArmeController from "../controllers/ArmeController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

router.post(
  "/purchase-incubate-xeet-card",
  hasAuth,
  ArmeController.purchaseIncubateXeetCard
);

router.post("/generate-arme", hasAuth, ArmeController.generateArme);

router.post("/extract-to-ton", hasAuth, ArmeController.extractToTon);

export default router;
