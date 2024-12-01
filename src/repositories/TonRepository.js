import BaseRepository from "./BaseRepository.js";
import Ton from "../models/TonWallet.js";

/**
 * @description BaseRepository
 * @class RankRepository
 */
class TonRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(Ton);
  }
}

export default TonRepository;
