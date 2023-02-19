import { HttpMethod } from './http-method.enum.js';
import { NextFunction, Request, Response } from 'express';

export interface RouteIntreface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
