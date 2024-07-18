const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

// Define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: "logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// Instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new DailyRotateFile(options.file),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// Create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.trim());
  },
};

module.exports = logger;
