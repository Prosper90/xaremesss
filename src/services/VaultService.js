import VaultRepository from "../repositories/VaultRepository.js";
import Logger from "../middlewares/log.js";

const vaultRepository = new VaultRepository();

export default class VaultService {
  static async addVault(vaultData) {
    try {
      return await vaultRepository.createVault(vaultData);
    } catch (error) {
      Logger.logger.error("Error adding vault:", error);
      throw error;
    }
  }

  static async getVaultById(vaultId) {
    try {
      return await vaultRepository.findByField("_id", vaultId);
    } catch (error) {
      Logger.logger.error("Error fetching vault:", error);
      throw error;
    }
  }

  static async getAllVaults() {
    try {
      return await vaultRepository.findAll();
    } catch (error) {
      Logger.logger.error("Error fetching all vaults:", error);
      throw error;
    }
  }

  static async updateVault(vaultId, updateData) {
    try {
      return await vaultRepository.updateVault(vaultId, updateData);
    } catch (error) {
      Logger.logger.error("Error updating vault:", error);
      throw error;
    }
  }

  static async suspendVault(vaultId, isSuspended) {
    try {
      return await vaultRepository.suspendVault(vaultId, isSuspended);
    } catch (error) {
      Logger.logger.error("Error suspending vault:", error);
      throw error;
    }
  }

  static async deleteVault(vaultId) {
    try {
      return await vaultRepository.deleteVault(vaultId);
    } catch (error) {
      Logger.logger.error("Error deleting vault:", error);
      throw error;
    }
  }
}
