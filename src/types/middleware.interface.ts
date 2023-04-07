import { NextFunction, Request, Response } from 'express';

export interface MiddleWareInterface {
  execute(req: Request, res: Response, next: NextFunction): void;
}
