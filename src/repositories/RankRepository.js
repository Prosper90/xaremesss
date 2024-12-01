import BaseRepository from './BaseRepository.js';
import Ranks from '../models/Ranks.js';

/**
 * @description BaseRepository
 * @class RankRepository
 */
class RankRepository extends BaseRepository {
  /**
     * @description create a new document
     * @param {string} model
     * @returns {document} returns a newly created document
     */
  constructor() {
    super(Ranks);
  }
}

export default RankRepository;
