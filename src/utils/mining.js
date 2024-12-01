import mineService from "../services/mineService.js";

const handleMiningScenario = async (
  user,
  checkOwner,
  minedData,
  impressions,
  likes,
  god_extractor,
  url
) => {
  try {
    let rewardMultiplier;
    let rewardType = "og";
    let xeetReward;
    let gemaReward;

    if (minedData) {
      if (minedData.og_user)
        throw new Error("This post has already been mined by og");
      if (minedData.sniper_user && checkOwner._id !== user._id)
        throw new Error("This post has already been snipped");

      //since its been mined, and its been by snipper, take account for og assuming its og coming to mine and return
      const minedDocument = await updateOgAfterSnipping("urlBank_id", {
        $set: {
          og_user: user._id,
          is_complete: true,
        },
        new: true,
      });
      rewardMultiplier = god_extractor ? 10 : 4;
      xeetReward = (impressions / 1000000) * rewardMultiplier;
      gemaReward = (likes / 100000) * rewardMultiplier;

      await Promise.all([
        xeetService.rewardXeet(user._id, xeetReward),
        gemaService.rewardGema(user._id, gemaReward),
      ]);
      return minedDocument;
    }

    if (!minedData && checkOwner._id.toString() !== user._id.toString()) {
      //this has not been mined, and this miner is not og but a snipper
      rewardMultiplier = god_extractor ? 10 : 4;
      xeetReward = (impressions / 1000000) * rewardMultiplier;
      gemaReward = (likes / 100000) * rewardMultiplier;
      rewardType = "sniper";

      //create for snipper and return
      const minedDocument = await mineService.create(
        undefined,
        user._id,
        gemaReward,
        xeetReward,
        impressions,
        likes,
        true,
        url,
        rewardType
      );

      await Promise.all([
        xeetService.rewardXeet(user._id, xeetReward),
        gemaService.rewardGema(user._id, gemaReward),
      ]);
      return minedDocument;
    }

    //now this is for og coming to mine thier post first
    rewardMultiplier = god_extractor ? 10 : 5;
    xeetReward = (impressions / 1000000) * rewardMultiplier;
    gemaReward = (likes / 100000) * rewardMultiplier;

    const minedDocument = await mineService.create(
      user._id,
      undefined,
      gemaReward,
      xeetReward,
      impressions,
      likes,
      true,
      url,
      rewardType
    );
    await Promise.all([
      xeetService.rewardXeet(user._id, xeetReward),
      gemaService.rewardGema(user._id, gemaReward),
    ]);
    return minedDocument;
  } catch (error) {
    throw error;
  }
};

export default handleMiningScenario;
