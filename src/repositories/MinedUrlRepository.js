import MinedUrl from "../models/MinedUrl.js";
import BaseRepository from "./BaseRepository.js";

/**
 * @description BaseRepository
 * @class UrlbankRepository
 */
class MinedUrlRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(MinedUrl);
  }
}

export default MinedUrlRepository;
