/* eslint-disable no-shadow */
import winston from 'winston';
import dotenv from 'dotenv';
import Sentry from 'winston-sentry-log';
// import SentryTransport from 'winston-sentry-node';
import config from '../bin/config/index';

dotenv.config();

const { SENTRY_DSN } = config;
const CONSOLE_DATE_FORMAT = 'HH:mm:ss.SSS';

/**
 * Factory method to create a logger with the parameters provided
 * @param {string} label Log label
 * @param {string} level Log level e.g info, debug, warn
 * @param {string} filename Filename to write logs
 * @returns {winston.Logger} Logger
 */

const options = {
  dsn: SENTRY_DSN,
  level: 'info',
  levelsMap: {
    verbose: 'info'
  }
};
const createLogger = () => {
  const label = process.env.LOG_LABEL || 'X-ARME';
  const level = process.env.LOG_LEVEL || 'info';
  const filename = process.env.LOG_FILE || 'X-ARME';
  const logger = winston.createLogger({
    level,
    transports: [],
  });

  // Console transport for display messages in the terminal
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label }),
      winston.format.timestamp({ format: CONSOLE_DATE_FORMAT }),
      winston.format.splat(),
      winston.format.printf(({
        level, message, label, timestamp,
      }) => `${timestamp} [${label}] ${level}: ${message}`),
    ),
  }));

  // If a filename is specified, create a file logger
  if (typeof filename === 'string' && filename.length) {
    logger.add(new winston.transports.File({
      filename,
      format: winston.format.combine(
        winston.format.label({ label }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.uncolorize(),
        winston.format.json(),
      ),
    }));
  }

  return logger;
};

const logger = createLogger();
export default logger;
