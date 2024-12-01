import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import response from "../utils/response.js";

/**
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Callback function to move to the next middleware
 */
export const hasAuth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.headers.authorization?.split(" ")[1] ||
      req.query.token;
    if (!token) {
      return res.status(401).json({
        status: false,
        error: "No token provided. Unauthorized access.",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return response(res, 403, {
          status: false,
          message: "Invalid authorization token",
        });
      }
      const user = await User.findById(payload.id);

      if (!user) {
        return response(res, 404, {
          status: false,
          message: "Invalid authorization token",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({
      status: false,
      error: "Failed to authenticate token. Please try again later.",
    });
  }
};

export default hasAuth;
