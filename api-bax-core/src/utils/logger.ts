const winston = require("winston");
require("winston-daily-rotate-file");

// Config Daily Rotate File
const transport = new winston.transports.DailyRotateFile({
    filename: "./logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "1m",
    maxFiles: "14d",
    level: "error",
    handleExceptions: true,
});

// Config Logger
const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.label({ label: "[LOGGER]" }),
        winston.format.printf(
            (info: { label: any; timestamp: any; level: any; message: any }) =>
                `${info.label} ${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
            ),
        }),
        transport,
    ],
});

module.exports = logger;
