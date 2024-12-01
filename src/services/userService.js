/* eslint-disable max-len */
/* eslint-disable camelcase */
import Logger from "../middlewares/log.js";
import UserRepository from "../repositories/UserRepository.js";

const userRepository = new UserRepository();

/**
 * @description UserService
 * @class UserService
 */
export default class UserService {
  /**
   * @description method find an return the user object of the inviter when an invitee wants to signup
   * @param
   * @returns {document} returns a user document object
   */
  static async findInviter(inviteCode) {
    try {
      const user = userRepository.findByField("inviteCode", inviteCode);
      if (!user) throw new Error("This inviter does not exist");
      return user;
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }

  /**
   * @description method for getting all users
   * @param {option} option
   * @returns {document} returns a user document
   */
  static async getAUser(field, searchBy) {
    try {
      // const { tgId } = option;
      const user = userRepository.findByField(field, searchBy);
      if (!user) throw new Error("This user does not exist");
      return user;
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }
  /**
   * @description Get user card details by userId
   * @param {string} userId
   * @returns {Object} returns User card details
   */
  static async getUserCardDetails(userId) {
    try {
      const cardDettails = await userRepository.getUserCardDetails(userId);
      if (!cardDettails) throw new Error("This card details does not exist");
      return cardDettails;
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }

  static async create(options) {
    try {
      const user = userRepository.create(options);
      return user;
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }

  /**
   * @description Update a user profile by userId
   * @param {string} userId - User ID of the user to update
   * @param {Object} updateOptions - Fields to update in the user profile
   * @returns {Document} Updated user document
   */
  static async updateUserProfile(userId, updateOptions) {
    try {
      const updatedUser = userRepository.update(userId, updateOptions);
      if (!updatedUser)
        throw new Error("Unable to update profile; user not found");
      return updatedUser;
    } catch (error) {
      Logger.logger.error(error);
      throw error;
    }
  }

  static async getUserCardDetails(userId) {
    try {
      const cardDetails = await userRepository.getUserCardDetails(userId);
      console.log(cardDetails, "shiiiiit only him");
      if (!cardDetails) throw new Error("User card details not found");

      return cardDetails;
    } catch (error) {
      Logger.logger.error(error.message);
      throw error;
    }
  }

  /**
   * @description Get user card details by userId
   * @param {string} id
   * @returns {Object} returns User card details
   */
  static async getUserAllDetails(id) {
    try {
      const userDetails = await userRepository.getUserAllDetails(id);

      if (!userDetails) throw new Error("User card details not found");

      return userDetails;
    } catch (error) {
      Logger.logger.error(error.message);
      throw error;
    }
  }
}
