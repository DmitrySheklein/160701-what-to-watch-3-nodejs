import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { MiddleWareInterface } from '../../types/middleware.interface';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';

const { Types } = mongoose;

export class ValidateObjectIdMiddleware implements MiddleWareInterface {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];
    const isValid = Types.ObjectId.isValid(objectId);

    if (isValid) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware',
    );
  }
}
