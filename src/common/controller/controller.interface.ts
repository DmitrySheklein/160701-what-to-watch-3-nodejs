import { RouteIntreface } from '../../types/route.interface.js';
import { Response, Router } from 'express';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteIntreface): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
