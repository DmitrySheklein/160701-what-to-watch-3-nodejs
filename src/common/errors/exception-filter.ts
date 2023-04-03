import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface';
import { ExceptionFilterInterface } from './exception-filter.interface';
import StatusCodes from 'http-status-codes';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface) {
    this.logger.info('Register ExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}
