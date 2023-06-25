import * as winston from 'winston';

const customFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
);

export const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.label({ label: 'Console' }),
            winston.format.timestamp(),
            customFormat,
        ),
    }),
    new winston.transports.File({
        filename: 'errors.log',
        dirname: 'logs',
        level: 'error',
        format: winston.format.combine(
            winston.format.label({ label: 'File' }),
            winston.format.timestamp(),
            customFormat,
        ),
    }),
];
