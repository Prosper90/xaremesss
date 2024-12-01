import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";

const TELEGRAM_BOT_TOKEN = process.env.JWT_SECRET;

export const verifyTelegramRequest = async (queryParams) => {
  const { hash, ...data } = queryParams;
  const dataCheckString = Object.keys(data)
    .filter((key) => key !== "hash")
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");
  const secret = crypto
    .createHash("sha256")
    .update(TELEGRAM_BOT_TOKEN)
    .digest();
  const calculatedHash = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");
  return calculatedHash === hash;
};
