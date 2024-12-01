import BaseRepository from './BaseRepository.js';
import AnalyticHistory from '../../src/models/AnalyticHistory.js';

/**
 * @description BaseRepository
 * @class AnalyticHistory
 */
class AnalyticHistoryRepository extends BaseRepository {
  /**
     * @description create a new document
     * @param {string} model
     * @returns {document} returns a newly created document
     */
  constructor() {
    super(AnalyticHistory);
  }
}

export default AnalyticHistoryRepository;
