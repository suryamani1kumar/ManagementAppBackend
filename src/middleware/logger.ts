import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, metadata }) => {
          return `[${timestamp}] ${level}: ${message}. ${metadata}`;
        })
      ),
    }),
    new transports.File({
      dirname: "./src/logs/",
      filename: "logger.log",
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(format.metadata(), format.timestamp()),
});
