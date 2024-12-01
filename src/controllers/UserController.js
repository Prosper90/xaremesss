import response from "../utils/response.js";
import { userDetail } from "../utils/apiFilter.js";
import gemaService from "../services/gemaService.js";
import xeetService from "../services/xeetService.js";
import rankService from "../services/rankService.js";
import UserService from "../services/userService.js";

/**
 * @description UserController
 */
class UserController {
  /**
   * @description get a user details
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof UserController
   */
  static async getUserDetails(req, res) {
    try {
      const user = req.user;
      const filterUserData = _.pick(user.toObject(), userDetail());
      return response(res, 200, {
        status: true,
        message: "User details retrieved successfully",
        data: filterUserData,
      });
    } catch (error) {
      return response(res, 500, {
        status: false,
        message: "A server error occured",
      });
    }
  }

  static async getUserScores(req, res) {
    try {
      const user = req.user;
      let gemaScore = await gemaService.getGemaScore(user._id);
      let xeetScore = await xeetService.getXeetScore(user._id);
      const scores = {
        gema: gemaScore.gemaScore,
        xeet: {
          score: xeetScore.xeetScore,
          numberOfImpressionPerAccount: xeetScore.numberOfImpressionPerAccount,
        },
      };
      return response(res, 200, {
        status: true,
        message: "User Scores Retrieved Successfully",
        data: scores,
      });
    } catch (error) {
      return response(res, 500, {
        status: false,
        message: "A server error occured",
      });
    }
  }

  /**
   * @description get a user by userId
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof UserController
   */
  static async getUserCardDetails(req, res) {
    try {
      const userId = req.query.userId; // Depends on frontend
      const cardDettails = await UserService.getUserCardDetails(userId);
      return res.status(200).json({
        message: "Successfully retrieved",
        data: cardDettails,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: 121,
        data: error.message,
      });
    }
  }
  //

  static async getUserAllDetails(req, res) {
    try {
      const id = req.query.id;

      console.log(id, "id");

      if (!id) {
        return res.status(400).json({
          success: false,
          errorCode: 122,
          message: "User ID is required",
        });
      }

      const userDetails = await UserService.getUserAllDetails(id);

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved",
        data: userDetails,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: 121,
        message: error.message,
      });
    }
  }
}

export default UserController;
