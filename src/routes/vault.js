import { Router } from "express";
import VaultController from "../controllers/VaultController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

router.post("/add-vault", hasAuth, VaultController.addVault);
router.get("/:vaultId/get-vault", hasAuth, VaultController.getVaultById);
router.get("/get-all-vaults", hasAuth, VaultController.getAllVaults);
router.put("/:vaultId/update-vault", hasAuth, VaultController.updateVault);
router.patch("/:vaultId/suspend-vault", hasAuth, VaultController.suspendVault);
router.delete("/:vaultId/delete-vault", hasAuth, VaultController.deleteVault);

export default router;
