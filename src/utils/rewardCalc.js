const rewardCalc = (
  extractorType,
  numberOfImpression,
  numberOfLikes,
  sniped
) => {
  //sniped is a boolean to determin wether or not the url has been sniped by a sniper
  let gamaScore = numberOfImpression / 1000000;
  let xeetScore = numberOfLikes / 100000;

  // Adjust scores based on extractorType and sniped flag
  const multiplier = extractorType === "GOD" ? 10 : extractorType === "OG" ? (sniped ? 4 : 5) : 1;

  xeetScore *= multiplier;
  gamaScore *= multiplier;

  return { xeetScore, gamaScore };
};

export default rewardCalc;
