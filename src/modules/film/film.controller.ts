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
import FilmFullResponse from './response/film-full.response.js';
import UpdateFilmDto from './dto/update-film.dto.js';

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
    this.addRoute({ path: '/promo', method: HttpMethod.Get, handler: this.promo });
    this.addRoute({ path: '/genres/:genre', method: HttpMethod.Get, handler: this.genre });
    this.addRoute({ path: '/:filmId', method: HttpMethod.Get, handler: this.currentFilm });
    this.addRoute({ path: '/:filmId', method: HttpMethod.Delete, handler: this.deleteFilm });
    this.addRoute({ path: '/:filmId', method: HttpMethod.Patch, handler: this.updateFilm });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit) || undefined;
    const films = await this.filmService.find(limit);

    this.send(res, StatusCodes.OK, fillDTO(FilmResponse, films));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response,
  ): Promise<void> {
    const userId = true;

    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can create film', 'FilmController');
    }

    const result = await this.filmService.create({
      ...body,
      userId: '642b1589f2a7670b6d002993',
      created: new Date(),
    });

    this.send(res, StatusCodes.CREATED, fillDTO(FilmResponse, result));
  }

  public async updateFilm(
    req: Request<Record<string, unknown>, Record<string, unknown>, UpdateFilmDto>,
    res: Response,
  ): Promise<void> {
    const { body, params } = req;
    const filmId = String(params.filmId);
    console.log(filmId, body);

    if (!filmId) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Не передан id фильма', 'FilmController');
    }

    // if (!body.userId) {
    //   throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can create film', 'FilmController');
    // }

    const result = await this.filmService.updateById(filmId, body);
    console.log(result);

    this.send(res, StatusCodes.CREATED, fillDTO(FilmResponse, result));
  }

  public async promo(_: Request, res: Response): Promise<void> {
    const film = await this.filmService.findPromo();

    this.send(res, StatusCodes.OK, fillDTO(FilmFullResponse, film));
  }

  public async genre(req: Request, res: Response): Promise<void> {
    const genre = req.params.genre;
    const limit = Number(req.query.limit);

    if (!genre) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Не передан тип жанра', 'FilmController' /* TODO брать имя из переменной*/);
    }

    const film = await this.filmService.findByGenre('Drama', limit);

    this.send(res, StatusCodes.OK, fillDTO(FilmResponse, film));
  }

  public async currentFilm(req: Request, res: Response): Promise<void> {
    const filmId = req.params.filmId;

    if (!filmId) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Не передан id фильма', 'FilmController');
    }

    const film = await this.filmService.findById(filmId);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Фильм с таким id не найден', 'FilmController');
    }

    this.send(res, StatusCodes.OK, fillDTO(FilmFullResponse, film));
  }

  public async deleteFilm(req: Request, res: Response): Promise<void> {
    const filmId = req.params.filmId;

    if (!filmId) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Не передан id фильма', 'FilmController');
    }

    const film = await this.filmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Фильм с таким id не найден', 'FilmController');
    }

    this.send(res, StatusCodes.NO_CONTENT, fillDTO(FilmFullResponse, film));
  }
}
