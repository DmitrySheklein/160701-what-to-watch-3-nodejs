import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';

@injectable()
export default class FilmController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    super(logger);
    this.logger.info('Register router for FilmController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public index(req: Request, res: Response): void {
    res.type('application/json').status(StatusCodes.OK).json({ data: 'hello' });
  }

  public create(req: Request, res: Response): void {
    // code
  }
}
