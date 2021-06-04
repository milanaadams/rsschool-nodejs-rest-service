import { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const requestLoggerFormat = printf(({ message, timestamp }) => `${timestamp} ${message}`);

const logger = createLogger({
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
    }),
    new transports.File({
      filename: './src/logging/error-logs.log',
      level: 'error'
    })
  ],
});

function requestLogger(req: Request, res: Response, next: CallableFunction): void {
  const {method} = req;
  const {url} = req;
  const query = Object.getOwnPropertyNames(req.query).length ? `\nQuery: ${JSON.stringify(req.query)}` : '';
  const params = Object.getOwnPropertyNames(req.params).length ? `\nParams: ${JSON.stringify(req.params)}` : '';
  const body = Object.getOwnPropertyNames(req.body).length ? `\nBody: ${JSON.stringify(req.body)}` : '';
  const responseCode = res.statusCode;

  logger.info(`Method: ${method} | Path: ${url} ${query} ${params} ${body} \nResponse status code: ${responseCode}`);
  next();
}

function errorLogger(err: Error, _req: Request, res: Response, next: CallableFunction): void {
  logger.error(`Response status code: ${res.statusCode} \nResponse message: ${err.message}`);
  next();
}

export { requestLogger, errorLogger };
