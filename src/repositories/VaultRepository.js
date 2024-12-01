import BaseRepository from "./BaseRepository.js";
import Vault from "../models/Vault.js";

class VaultRepository extends BaseRepository {
  constructor() {
    super(Vault);
  }

  async findAll() {
    return await super.findAll({});
  }

  async createVault(vaultData) {
    return await this.create(vaultData);
  }

  async updateVault(vaultId, updateData) {
    return await this.updateById(vaultId, updateData);
  }

  async suspendVault(vaultId, isSuspended) {
    return await this.updateById(vaultId, { isSuspended });
  }

  async deleteVault(vaultId) {
    return await this.deleteById(vaultId);
  }
}

export default VaultRepository;
