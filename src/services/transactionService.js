import TransactionsRepository from '../repositories/TransactionsRepository.js';
import Logger from '../middlewares/log.js';

const transactionRepository = new TransactionsRepository();

/**
 * @description TransactionService
 * @class TransactionService
 */
class TransactionService {
    /**
   * @description Fetch all transactions for a user
   * @param {option} option
   * @returns {Promise<Array>} - Array of transactions
   */
  static async createTransaction(options) {
    try {
        
    } catch (error) {
        Logger.logger.error(error.data);
        throw error;
    }
  }

  /**
   * @description Fetch all transactions for a user
   * @param {option} option
   * @returns {Promise<Array>} - Array of transactions
   */
  static async getUserTransactions(option) {
    try {
        const {userId } = option;
        const transactions =  await transactionRepository.findByFieldAll('userId', userId);
        if (!transactions) throw new Error('The user transaction does  not exist');
        return transactions;
    } catch (error) {
        Logger.logger.error(error.data);
        throw error;
    }
  }
}

export default TransactionService;
