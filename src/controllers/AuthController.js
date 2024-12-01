import { verifyTelegramRequest } from "../utils/telegram.js";
import UserService from "../services/userService.js";
import {
  generateRandomAlphaNumeric,
  createToken,
} from "../utils/createTokens.js";
import gemaService from "../services/gemaService.js";
import xeetService from "../services/xeetService.js";
import tonService from "../services/tonService.js";
import { randomUUID } from "crypto";
import referralService from "../services/referralService.js";
import Logger from "../middlewares/log.js";
import dailyClaimsService from "../services/dailyClaimsService.js";
// import { log } from "console";
import rankService from "../services/rankService.js";
import axios from "axios";
import {
  validateTonWalletAddress,
  validateTwitterUsername,
} from "../utils/validator.js";

class AuthController {
  /**
   * @description login and signup of a user using their telegram account
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof AuthController
   */
  static async authenticateUser(req, res) {
    try {
      const queryParams = req.query;

      // const verify = await verifyTelegramRequest(queryParams);
      const verify = true;
      if (!verify) {
        return res.status(403).json({
          status: false,
          error: "Could not validate telegram details",
        });
      }

      const telegramUser = JSON.parse(queryParams.user);

      //Check for required parameters
      const requiredFields = ["id", "username", "first_name"];

      for (const field of requiredFields) {
        if (!Object.keys(telegramUser).includes(field)) {
          return res.status(403).json({
            status: false,
            error: `${field} data is required`,
          });
        }
      }

      let user = await UserService.getAUser("tgId", telegramUser.id);

      if (!user) {
        const userData = {
          userId: randomUUID(),
          tgId: telegramUser.id,
          tgUsername: telegramUser.username,
          username: telegramUser.first_name,
          inviteCode: generateRandomAlphaNumeric(10),
        };
        user = await UserService.create(userData);
        await gemaService.create(user._id);
        await xeetService.create(user._id);
        await rankService.create(user._id);
        await tonService.create(user._id);
        await dailyClaimsService.create(user._id);

        //check if invite code was sent in query
        if (telegramUser.inviteCode) {
          //since no user was found, find the inviter by the inviteCode
          let inviter = await UserService.findInviter(telegramUser.inviteCode);

          if (inviter) {
            //if inviter is found, reward the inviter
            await gemaService.rewardGema(inviter._id, 1);
            //update the referalSystem
            await referralService.create(
              user._id,
              telegramUser.inviteCode,
              inviter._id
            );
          }
        }
      }
      const token = createToken(user._id);
      const mainUser = await UserService.getUserAllDetails(user._id);
      return res.status(200).json({
        message: "User authenticated successfully.",
        mainUser,
        token,
      });
    } catch (error) {
      console.log(error, "error oooo");
      Logger.logger.error(error);
      return res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  /**
   * @description Link a Twitter account to the user profile by verifying the username
   * @param {object} req
   * @param {object} res
   * @returns {object} a JSON object
   * @memberof AuthController
   */
  static async linkTwitter(req, res) {
    try {
      const { twitterUsername } = req.body;
      const { errors, valid } = validateTwitterUsername(twitterUsername);

      if (!valid) {
        return res.status(400).json({
          status: false,
          errors,
        });
      }

      const twitterUrl = `https://x.com/${twitterUsername}`;

      try {
        const response = await axios.get(twitterUrl);

        if (response.status === 200) {
          const userData = {
            xHandle: twitterUsername,
            isTwitterActive: true,
            twitterDetails: {
              xHandle: twitterUsername,
              XUrl: twitterUrl,
            },
          };
          const updatedUser = UserService.updateUserProfile(
            req.user.id,
            userData
          );
          return res.status(200).json({
            message: "Twitter account linked successfully.",
            user: updatedUser,
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res.status(404).json({
            status: false,
            error: "Invalid Twitter username. Account not found.",
          });
        }
        return res.status(500).json({
          status: false,
          error: "A server error occurred. Please try again later.",
        });
      }
    } catch (error) {
      Logger.logger.error(error);
      return res.status(500).json({
        status: false,
        error: "A server error occurred. Please try again later.",
      });
    }
  }

  /**
   * @description Link a TON wallet to the user profile by verifying the wallet address format
   * @param {object} req
   * @param {object} res
   * @returns {object} a JSON object
   * @memberof AuthController
   */
  static async linkTonWallet(req, res) {
    try {
      const { tonWalletAddress } = req.body;
      const { errors, valid } = validateTonWalletAddress(tonWalletAddress);

      if (!valid) {
        return res.status(400).json({
          status: false,
          errors,
        });
      }

      const userData = {
        tonWalletDetails: {
          tonWalletAddress,
        },
      };

      const updatedUser = UserService.updateUserProfile(req.user.id, userData);
      return res.status(200).json({
        message: "TON wallet linked successfully.",
        user: userData,
      });
    } catch (error) {
      Logger.logger.error(error);
      return res.status(500).json({
        status: false,
        error: "A server error occurred. Please try again later.",
      });
    }
  }
}

export default AuthController;
