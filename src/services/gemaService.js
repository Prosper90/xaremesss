import Logger from "../middlewares/log.js";
import GemaRepository from "../repositories/gemaRepository.js";

const gemaRepository = new GemaRepository();
/**
 * @description helper
 * @class gemaService
 */
export default class {
  static async rewardGema(user_id, amount) {
    try {
      gemaRepository.increment(user_id, "gemaScore", amount);
    } catch (error) {
      throw error;
    }
  }

  static async getGemaScore(user_id) {
    try {
      const gemaScore = await gemaRepository.findByField("userId", user_id);
      if (!gemaScore) throw new Error("This data does not exist");
      return gemaScore;
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }

  static async create(user_id) {
    try {
      gemaRepository.create({
        userId: user_id,
      });
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }
}
