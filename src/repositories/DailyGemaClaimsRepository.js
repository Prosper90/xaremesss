import BaseRepository from "./BaseRepository.js";
import DailyGemaClaims from "../models/DailyGemaClaims.js";

/**
 * @description DailyGemaClaimsRepository
 * @class DailyGemaClaimsRepository
 */
class DailyGemaClaimsRepository extends BaseRepository {
  constructor() {
    super(DailyGemaClaims);
  }


}

export default DailyGemaClaimsRepository;
