import VaultService from "../services/VaultService.js";
import response from "../utils/response.js";
import { validateVaultData } from "../utils/validator.js";

class VaultController {
  static async addVault(req, res) {
    try {
      const vaultData = req.body;
      const { errors, valid } = validateVaultData(vaultData);

      if (!valid) {
        return response(res, 400, {
          success: false,
          errors,
        });
      }

      const newVault = await VaultService.addVault(vaultData);
      return response(res, 201, {
        success: true,
        message: "Vault Added Successfully",
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error adding vault",
        error: error.message,
      });
    }
  }

  static async updateVault(req, res) {
    try {
      const { vaultId } = req.params;
      const updateData = req.body;

      const errors = {};
      let valid = true;

      if (
        updateData.valueName !== undefined &&
        updateData.valueName.trim() === ""
      ) {
        errors.valueName = "Value name cannot be empty";
        valid = false;
      }

      if (
        updateData.imageUrl !== undefined &&
        updateData.imageUrl.trim() === ""
      ) {
        errors.imageUrl = "Value image URL cannot be empty";
        valid = false;
      }

      if (
        updateData.suspend !== undefined &&
        typeof updateData.suspend !== "boolean"
      ) {
        errors.suspend = "Suspend must be a boolean";
        valid = false;
      }

      if (
        updateData.achievements !== undefined &&
        !Array.isArray(updateData.achievements)
      ) {
        errors.achievements = "Achievements must be an array";
        valid = false;
      }

      if (
        updateData.requirements !== undefined &&
        !Array.isArray(updateData.requirements)
      ) {
        errors.requirements = "Requirements must be an array";
        valid = false;
      }

      if (
        updateData.metadata !== undefined &&
        typeof updateData.metadata !== "object"
      ) {
        errors.metadata = "Metadata must be an object";
        valid = false;
      }

      if (!valid) {
        return response(res, 400, {
          success: false,
          errors,
        });
      }

      const updatedVault = await VaultService.updateVault(vaultId, updateData);
      return response(res, 200, {
        success: true,
        message: "Vault Updated Successfully",
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error updating vault",
        error: error.message,
      });
    }
  }

  static async getAllVaults(req, res) {
    try {
      const vaults = await VaultService.getAllVaults();
      return response(res, 200, { success: true, vaults });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error fetching vaults",
        error: error.message,
      });
    }
  }

  static async getVaultById(req, res) {
    try {
      const { vaultId } = req.params;

      if (!vaultId) {
        return response(res, 400, {
          success: false,
          message: "Vault ID is required",
        });
      }

      const vault = await VaultService.getVaultById(vaultId);
      if (!vault) {
        return response(res, 404, {
          success: false,
          message: "Vault not found",
        });
      }
      return response(res, 200, { success: true, vault });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error fetching vault",
        error: error.message,
      });
    }
  }

  static async suspendVault(req, res) {
    try {
      const { vaultId } = req.params;

      if (!vaultId) {
        return response(res, 400, {
          success: false,
          message: "Vault ID is required",
        });
      }

      const { isSuspended } = req.body;

      if (typeof isSuspended !== "boolean") {
        return response(res, 400, {
          success: false,
          message: "isSuspended must be a boolean value",
        });
      }

      await VaultService.suspendVault(vaultId, isSuspended);
      return response(res, 200, {
        success: true,
        message: `Vault ${isSuspended ? "suspended" : "unsuspended"}`,
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error suspending vault",
        error: error.message,
      });
    }
  }

  static async deleteVault(req, res) {
    try {
      const { vaultId } = req.params;

      if (!vaultId) {
        return response(res, 400, {
          success: false,
          message: "Vault ID is required",
        });
      }

      await VaultService.deleteVault(vaultId);
      return response(res, 200, {
        success: true,
        message: "Vault deleted successfully",
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error deleting vault",
        error: error.message,
      });
    }
  }
}

export default VaultController;
