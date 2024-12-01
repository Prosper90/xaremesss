import XeetRepository from "../repositories/xeetRepository.js";

const xeetRepository = new XeetRepository();
/**
 * @description helper
 * @class helper
 */
export default class {

  static async rewardXeet(user_id, amount) {
    try {
      // gemaRepository.increment(user_id, "gemaScore", amount);
      xeetRepository.increment(user_id, "xeetScore", amount);
    } catch (error) {
      throw error;
    }
  }

  static async getXeetScore(user_id) {
    try {
      // const {
      //   tgId
      // } = option;
      const xeetScore = await xeetRepository.findByField("userId", user_id);
      if (!xeetScore) throw new Error("This data does not exist");
      return xeetScore;
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }


  static async create(user_id) {
    try {
      xeetRepository.create({
        userId: user_id,
      });
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
