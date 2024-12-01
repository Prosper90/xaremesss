import TransactionService from "../services/transactionService.js";

/**
 * @description TransactionController
 */
class TransactionController {
    /**
     * @description Handles all transaction request
     * @param  {object} req
     * @param {object} res
     * @returns {object} a json object
     * @memberof TransactionController
     */

    static async getUserTransactions (req, res) {
        try {
            const option = req.query// Depends on frontend
            const userTransactions = await TransactionService.getUserTransactions(option);
            return res.status(200).json({
              message: 'Successfully retrieved',
              data: userTransactions
            });
        } catch (error) {
            return res.status(400).json({
              success: false,
              errorCode: 121,
              data: error.message,
            });
        }
    }
}

export default TransactionController