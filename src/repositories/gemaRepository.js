import BaseRepository from './BaseRepository.js';
import Gema from '../../src/models/Gema.js';

/**
 * @description BaseRepository
 * @class GemaRepository
 */
class GemaRepository extends BaseRepository {
  /**
     * @description create a new document
     * @param {string} model
     * @returns {document} returns a newly created document
     */
  constructor() {
    super(Gema);
  }
}

export default GemaRepository;
