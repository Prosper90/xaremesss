import response from "../utils/response.js";
import rankService from "../services/rankService.js";

/**
 * @description RankController
 */
class RankController {
 
    /**
   * @description get a user rank by userId
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof RankController
   */
  static async getUserRankColor(req,res){
    try {
      const user = req.user;
      const rankColordetails = await rankService.getRankColor(user._id);
      const rankcolor = {
        "color": rankColordetails
      }

      res.status(200).json({ status: true, message: "User Rank Color Retrieved Successfully", data: rankcolor })
    } catch (error) {
      return res.status(400).json({
        success:false,
        errorCode:121,
        data: error.message

      })
    }
  }
}

export default RankController