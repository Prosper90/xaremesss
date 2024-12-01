import BaseRepository from './BaseRepository.js';
import Transactions from '../../src/models/Transactions.js';

/**
 * @description TransactionsRepository
 * @class TransactionsRepository
 */
class TransactionsRepository extends BaseRepository {
  constructor() {
    super(Transactions);
  }

}

export default TransactionsRepository;
