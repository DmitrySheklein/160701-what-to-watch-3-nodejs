import { Request, Response, NextFunction } from 'express';
import { MiddleWareInterface } from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class PrivateRouteMiddleware implements MiddleWareInterface {
  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'PrivateRouteMiddleware');
    }
    return next();
  }
}
