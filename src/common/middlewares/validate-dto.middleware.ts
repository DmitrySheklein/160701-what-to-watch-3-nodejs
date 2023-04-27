import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MiddleWareInterface } from '../../types/middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { transformErrors } from '../../utils/common.js';
import ValidationError from '../errors/validation-error.js';

export class ValidateDtoMiddleware implements MiddleWareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body, params } = req;
    const dtoInstance = plainToInstance(this.dto, { ...body, ...params });
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: "${req.path}"`, transformErrors(errors));
    }
    next();
  }
}
