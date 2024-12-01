import { Router } from "express";
import userRoutes from "./user.js";
import transactionRoutes from "./transactions.js";
import authRoutes from "./auth.js";
import refRoutes from "./ref.js";
import rankRoutes from "./rank.js";
import PensionRoutes from "./pension.js";
import DailyClaimsRoutes from "./dailyClaims.js";
import AnalyticRoutes from "./analytic.js";
import vaultRoutes from "./vault.js";
import DailyGemaRoutes from "./dailyGema.js";
import MineRoutes from "./mine.js";


const router = Router();

// Base route for API
router.get("/ping", (req, res) => {
  res.status(200).json({
    message: "Welcome to  X-ARME API",
  });
});

// Mount user routes under /v1/user
router.use("/v1/user", userRoutes);
router.use("/v1/auth", authRoutes);
// Mount transaction routes under transactions
router.use("/v1/transactions", transactionRoutes);
// Mount referral routes
router.use("/v1/referrals", refRoutes);
// Mount rank routes
router.use("/v1/rank", rankRoutes);

router.use("/v1/pension", PensionRoutes);
router.use("/v1/analytic", AnalyticRoutes);

// mount daily claims routes
router.use("/v1/daily", DailyClaimsRoutes);
router.use("/v1/dailygema", DailyGemaRoutes);

/* Vault Route */
router.use("/v1/vaults", vaultRoutes);

/* Mounting minning route */
router.use("/v1/mine", MineRoutes);

export default router;
