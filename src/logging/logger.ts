import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const requestLoggerFormat = printf(({ message, timestamp }) => `${timestamp} ${message}`);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    requestLoggerFormat,
  ),
  transports: [
    new transports.File({
      filename: './src/logging/info-logs.log',
      level: 'info'
    })
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
      filename: './src/logging/error-logs.log',
      level: 'error'
    })
  ],
});

function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const {method} = req;
  const {url} = req;
  const query = Object.getOwnPropertyNames(req.query).length ? `\nQuery: ${JSON.stringify(req.query)}` : '';
  const body = Object.getOwnPropertyNames(req.body).length ? `\nBody: ${JSON.stringify(req.body)}` : '';
  logger.info(`Method: ${method} | Path: ${url} ${query} ${body}`);
  next();

  finished(req, res, () => {
    if(res.statusCode) {
      logger.info(`Response status code: ${res.statusCode }`);
    }
  })
}

function errorLogger(err: Error, req: Request, res: Response, next: CallableFunction): void {
  errLogger.error(`Response status code: ${res.statusCode} \nResponse message: ${err.message}`);
  next();
}

// Used for logging uncaughtExceptions so the process.exit(1) doesn't stop writing to log files.
function syncLogger(err: Error, title: string): void {
const date = new Date();
const dateNow = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T',' ');
writeFileSync(resolve(__dirname, '../logging/error-logs.log'), `${dateNow} ${title}: ${err.message}\n`, { flag: 'a'});
process.stderr.write(`Error message: ${err.message}\n`);
}

export { requestLogger, errorLogger, syncLogger };
