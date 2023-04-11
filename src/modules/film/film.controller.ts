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
import * as core from 'express-serve-static-core';
import { RequestQuery } from '../../types/request-query.type.js';
import { Genres } from '../../types/film.type.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';

export type ParamsGetFilm = {
  filmId: string;
};

type ParamsGenreFilm = {
  genre: Genres;
};

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmService,
  ) {
    super(logger);
    this.logger.info('Register router for FilmController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateFilmDto)],
    });
    this.addRoute({ path: '/promo', method: HttpMethod.Get, handler: this.promo });
    this.addRoute({
      path: '/genres/:genre',
      method: HttpMethod.Get,
      handler: this.genre,
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('filmId')],
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('filmId'), new ValidateDtoMiddleware(UpdateFilmDto)],
    });
  }

  public async index(
    { query }: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const limit = query.limit;
    const films = await this.filmService.find(limit);

    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response,
  ): Promise<void> {
    const userId = true;

    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can create film', 'FilmController');
    }
    const result = await this.filmService.create(body);
    const film = await this.filmService.findById(result.id);

    this.created(res, fillDTO(FilmResponse, film));
  }

  public async update(
    { body, params }: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response,
  ): Promise<void> {
    const filmId = params.filmId;
    const userId = true;

    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can update film', 'FilmController');
    }

    const film = await this.filmService.updateById(filmId, body);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Фильм с таким id не найден', 'FilmController');
    }

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async promo(_: Request, res: Response): Promise<void> {
    const film = await this.filmService.findPromo();

    this.send(res, StatusCodes.OK, fillDTO(FilmFullResponse, film));
  }

  private isGenre(genre: string | Genres): genre is Genres {
    return Object.values(Genres)
      .map((el) => el.toLocaleLowerCase())
      .includes(genre as Genres);
  }

  public async genre(
    { params, query }: Request<core.ParamsDictionary | ParamsGenreFilm, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const paramGenre = params.genre;

    if (!this.isGenre(paramGenre)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Несуществующий тип жанра', 'FilmController');
    }
    const [first, ...rest] = paramGenre;
    const genre = [first.toUpperCase(), ...rest].join('') as Genres;
    const limit = query.limit;
    const films = await this.filmService.findByGenre(genre, limit);

    if (!films.length) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Фильмы жанра "${genre}" не найдены`,
        'FilmController' /* TODO брать имя из переменной*/,
      );
    }
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;
    const film = await this.filmService.findById(filmId);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Фильм с таким id не найден', 'FilmController');
    }

    this.ok(res, fillDTO(FilmFullResponse, film));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;
    const film = await this.filmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Фильм с таким id не найден', 'FilmController');
    }

    this.noContent(res, fillDTO(FilmFullResponse, film));
  }
}
