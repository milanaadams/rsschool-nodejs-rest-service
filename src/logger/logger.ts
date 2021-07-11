import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { Request, Response } from 'express';
import { finished } from 'stream';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const removePass = (info) => {
  if (info.password) {
    const copyInfo = { ...info };
    delete copyInfo.password;
    return copyInfo;
  }
  return info;
};

const requestLoggerFormat = printf(
  ({ message, timestamp }) => `${timestamp} ${message}`,
);

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    requestLoggerFormat,
  ),
  transports: [
    new transports.File({
      filename: './src/logger/info-logs.log',
      level: 'info',
    }),
  ],
});

const errLogger = createLogger({
  level: 'error',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    requestLoggerFormat,
  ),
  transports: [
    new transports.File({
      filename: './src/logger/error-logs.log',
      level: 'error',
    }),
  ],
});

function requestLogger(req: Request, res: Response): void {
  const { method } = req;
  const { url } = req;
  const query = Object.getOwnPropertyNames(req.query).length
    ? `\nQuery: ${JSON.stringify(req.query)}`
    : '';
  const body = Object.getOwnPropertyNames(req.body).length
    ? `\nBody: ${JSON.stringify(removePass(req.body))}`
    : '';
  logger.info(`Method: ${method} | Path: ${url} ${query} ${body}`);

  finished(req, res, () => {
    if (res.statusCode) {
      logger.info(`Response status code: ${res.statusCode}`);
    }
  });
}

function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: CallableFunction,
): void {
  errLogger.error(
    `Response status code: ${res.statusCode} \nResponse message: ${err.message}`,
  );
  next();
}

// Used for logging uncaughtExceptions so the process.exit(1) doesn't stop writing to log files.
function syncLogger(err: Error, title: string): void {
  const date = new Date();
  const dateNow = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  writeFileSync(
    resolve(__dirname, '../logging/error-logs.log'),
    `${dateNow} ${title}: ${err.message}\n`,
    { flag: 'a' },
  );
  process.stderr.write(`Error message: ${err.message}\n`);
}

export { requestLogger, errorLogger, syncLogger };
