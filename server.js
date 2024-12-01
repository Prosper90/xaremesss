import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import xss from "xss-clean";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import logger from "morgan";
import cookieParser from "cookie-parser";

import routes from "./src/routes/index.js";
import Logger from "./src/middlewares/log.js";

import cron from "node-cron";
import PensionService from "./src/services/PensionService.js";
import AnalyticService from "./src/services/AnalyticService.js";

// Schedule a cron job to run daily at midnight (00:00) to deduct 1 Gema for pension fund
cron.schedule("0 0 * * *", async () => {
  try {
    await PensionService.autoPensionContribution();
    await AnalyticService.deleteOldAnalyticsHistory();
    await AnalyticService.resetDailyAnalytics();
    console.log("Daily pension contributions processed successfully.");
  } catch (error) {
    console.error(
      "Error in processing daily pension contributions:",
      error.message
    );
  }
});

const app = express();

app.use(express.static("public"));
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(Logger.logRequest);
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.json({ limit: "10000000kb" })); // Preventing DOS Attacks
// Data sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(logger("dev"));

// Rate Limiting
const limit = rateLimit({
  max: 1000000000, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 0
  message: "Too many requests", // message to send
});
// ROUTES
// Mount the routes with the base URL
app.use("/", limit); // Apply the rate limiting globally

// Mount API routes
app.use("/api", routes);

app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route",
  });
  next();
});
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: false,
    message: err.message,
  });
  next();
});

export default app;
