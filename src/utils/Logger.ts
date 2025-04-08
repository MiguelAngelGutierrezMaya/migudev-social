import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${String(timestamp)} [${String(level)}]: ${String(message)}`;

  // Add metadata if exists
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    // Console transport with colors for development
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Export a default logger instance
export default logger;

// Export common logging methods with type safety
export const logInfo = (
  message: string,
  meta?: Record<string, unknown>,
): winston.Logger => logger.info(message, meta);
export const logError = (
  message: string,
  meta?: Record<string, unknown>,
): winston.Logger => logger.error(message, meta);
export const logWarn = (
  message: string,
  meta?: Record<string, unknown>,
): winston.Logger => logger.warn(message, meta);
export const logDebug = (
  message: string,
  meta?: Record<string, unknown>,
): winston.Logger => logger.debug(message, meta);
