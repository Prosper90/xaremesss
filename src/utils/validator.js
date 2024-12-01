import validator from "validator";

const validateTwitterUsername = (twitterUsername) => {
  const errors = {};
  if (validator.isEmpty(twitterUsername)) {
    errors["twitterUsername"] = "Twitter username is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateTonWalletAddress = (tonWalletAddress) => {
  const errors = {};
  const tonAddressRegex = /^([A-Za-z0-9_-]{48}|[A-Za-z0-9_-]{66})$/;
  if (validator.isEmpty(tonWalletAddress)) {
    errors["tonWalletAddress"] = "TON wallet address is required";
  } else if (!tonAddressRegex.test(tonWalletAddress)) {
    errors["tonWalletAddress"] = "Invalid TON wallet address format";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateVaultData = (vaultData) => {
  const errors = {};

  if (validator.isEmpty(vaultData.valueName)) {
    errors.valueName = "Vault name is required";
  }

  if (!validator.isURL(vaultData.imageUrl)) {
    errors.imageUrl = "A valid URL is required for the image";
  }

  if (typeof vaultData.suspend !== "boolean") {
    errors.suspend = "Suspend must be a boolean value";
  }

  if (
    !Array.isArray(vaultData.achievements) ||
    vaultData.achievements.length === 0
  ) {
    errors.achievements = "At least one achievement is required";
  }

  if (!Array.isArray(vaultData.requirements)) {
    errors.requirements = "Requirements must be an array";
  }

  if (vaultData.metadata && typeof vaultData.metadata !== "object") {
    errors.metadata = "Metadata must be an object";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export { validateTwitterUsername, validateTonWalletAddress, validateVaultData };
