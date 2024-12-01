// import TonRepository from "../repositories/TonRepository";

import TonRepository from "../repositories/TonRepository.js";

const tonRepository = new TonRepository();
/**
 * @description helper
 * @class helper
 */
export default class {
  static async create(user_id) {
    try {
      tonRepository.create({
        userId: user_id,
      });
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
