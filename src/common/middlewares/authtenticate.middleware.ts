import * as jose from 'jose';
import { Request, Response, NextFunction } from 'express';
import { MiddleWareInterface } from '../../types/middleware.interface.js';
import { createSecretKey } from 'crypto';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class AuthtenticateMiddleware implements MiddleWareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');

    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jose.jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      const { email, id } = payload;
      req.user = { email, id } as { email: string; id: string };

      return next();
    } catch {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid Token', 'AuthtenticateMiddleware'));
    }
  }
}
