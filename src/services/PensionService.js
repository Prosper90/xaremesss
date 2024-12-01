import PensionAccountRepository from "../repositories/PensionRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import GemaRepository from "../repositories/gemaRepository.js";
import Logger from "../middlewares/log.js";
import AnalyticService from "./AnalyticService.js";


const pensionAccountRepository = new PensionAccountRepository();
const userRepository = new UserRepository();
const gemaRepository = new GemaRepository();

export default class PensionService {
  /**
   * @description Toggle Pension Fund Contribution (On/Off)
   * @param {string} userId
   * @param {boolean} isActive
   */
  static async togglePensionFund(userId, isActive) {
    try {
      // Update user status (assuming user model has a pension toggle field)
      const user = await userRepository.update(userId, { isPensionActive: isActive });
      if (!user) throw new Error("User not found");

      return { success: true, message: `Pension fund is now ${isActive ? 'activated' : 'deactivated'}` };
    } catch (error) {
      Logger.logger.error(error);
      throw error;
    }
  }

  /**
 * @description Deduct 1 Gema and add to Pension Account if activated, and update analytics for pension contribution. Increment daysPensionSkipped for users without pension active.
 */
  static async autoPensionContribution() {
    try {
      // Fetch all users
      const allUsers = await userRepository.findAll();

      for (const user of allUsers) {
        const { userId, isPensionActive } = user;

        if (isPensionActive) {
          // Pension is active, process the contribution
          const gemaScore = await gemaRepository.findByField('userId', userId);

          if (!gemaScore || gemaScore.gemaScore < 1) {
            Logger.logger.warn(`User ${userId} does not have enough Gema to contribute.`);

            // Update analytics to increment 'daysPensionSkipped' since user has insufficient balance
            await AnalyticService.updateAnalytics(userId, { daysPensionSkipped: 1 });
            continue;
          }

          // Deduct 1 Gema from the user's Gema balance
          await gemaRepository.increment(userId, 'gemaScore', -1);

          // Add 1 Gema to the user's Pension Account
          await pensionAccountRepository.incrementPensionContribution(userId);

          Logger.logger.info(`1 Gema deducted from user ${userId} and added to their Pension Account.`);

          // Update analytics to increment 'daysPensionContributed'
          await AnalyticService.updateAnalytics(userId, { daysPensionContributed: 1 });
        } else {
          // Pension is not active, increment 'daysPensionSkipped'
          await AnalyticService.updateAnalytics(userId, { daysPensionSkipped: 1 });
        }
      }
    } catch (error) {
      Logger.logger.error("Error in auto pension contribution:", error);
      throw error;
    }
  }

}


