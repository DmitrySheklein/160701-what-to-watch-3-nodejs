import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import FilmService from './film.service.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmService,
  ) {
    super(logger);
    this.logger.info('Register router for FilmController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    res.type('application/json').status(StatusCodes.OK).json(films);
  }

  public create(_: Request, res: Response): void {
    res.type('application/json').status(StatusCodes.CREATED).json({ data: 'create' });
  }
}
