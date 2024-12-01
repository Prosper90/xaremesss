import dotenv from "dotenv";

dotenv.config();

const config = {
  LOG_LABEL: process.env.LOG_LABEL || "X-ARME",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  LOG_FILE: process.env.LOG_FILE || "X-ARME.log",
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: process.env.PORT || "3000",
  URL: process.env.URL || "http://localhost:8000",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/xarme-test",
  NODE_ENV: process.env.NODE_ENV || "development",
  Endpoint: process.env.Endpoint || "/v1",
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS,
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_SECRET,
};

export default config;
