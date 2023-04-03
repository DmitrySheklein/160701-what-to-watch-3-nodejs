import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import FilmService from './film.service.js';
import { fillDTO } from '../../utils/common.js';
import FilmResponse from './response/film.response.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';

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
    const filmsResponse = fillDTO(FilmResponse, films);
    res.type('application/json').status(StatusCodes.OK).json(filmsResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response,
  ): Promise<void> {
    if (!body.userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user create film', 'FilmController');
    }

    const result = await this.filmService.create({
      ...body,
      userId: '64203e5cc388ef9e7d53e35d',
    });
    console.log(body);

    this.send(res, StatusCodes.CREATED, fillDTO(FilmResponse, result));
  }
}
