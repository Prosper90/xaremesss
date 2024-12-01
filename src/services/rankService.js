import RankRepository from "../repositories/RankRepository.js";

const rankRepository = new RankRepository();
/**
 * @description helper
 * @class helper
 */
export default class  {
    static async getRankColor(user_id) {
      try {      
        const userRank = await rankRepository.findByField('userId', user_id);
        
        if (!userRank) throw new Error('This data does not exist');
        return userRank.rankColor;
      } catch (error) {
        
        logger.error(error.data);
        throw error;
      }
  }

    static async create(user_id) {
      try {
        rankRepository.create({
          userId: user_id
        });
      } catch (error) {
        logger.error(error.data)
        throw error;
      }
    }
  }