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
import CommentService from '../comment/comment.service.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import FavoriteService from '../favorite/favorite.service.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import UploadImageResponse from './response/upload-image.response.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';

export type ParamsGetFilm = {
  filmId: string;
};

type ParamsGenreFilm = {
  genre: Genres;
};

const FilmControllerRoute = {
  FilmId: 'filmId',
  Genre: 'genre',
};

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmService,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentService,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteService,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register router for FilmController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateFilmDto)],
    });
    this.addRoute({ path: '/promo', method: HttpMethod.Get, handler: this.promo });
    this.addRoute({
      path: `/genres/:${FilmControllerRoute.Genre}`,
      method: HttpMethod.Get,
      handler: this.genre,
    });
    this.addRoute({
      path: `/:${FilmControllerRoute.FilmId}`,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware(FilmControllerRoute.FilmId),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
    this.addRoute({
      path: `/:${FilmControllerRoute.FilmId}`,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(FilmControllerRoute.FilmId),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
    this.addRoute({
      path: `/:${FilmControllerRoute.FilmId}`,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(FilmControllerRoute.FilmId),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
    this.addRoute({
      path: `/:${FilmControllerRoute.FilmId}/image`,
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(FilmControllerRoute.FilmId),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'posterImage'),
      ],
    });
  }

  public async index(
    { query, user }: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const limit = query.limit; //TODO фикс с typeof string
    const favoritesIds = await this.favoriteService.findAll(user?.id);
    const defaultFilms = await this.filmService.find(limit);
    const films = defaultFilms.map((film) => ({
      ...film,
      isFavorite: favoritesIds?.includes(film._id.toString()),
    }));

    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response,
  ): Promise<void> {
    const {
      body,
      user: { id: userId },
    } = req;

    const result = await this.filmService.create({ ...body, userId });
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

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async uploadImage(
    req: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response,
  ) {
    const { filmId } = req.params;
    const updateDto = { posterImage: req.file?.filename };

    // await this.filmService.updateById(filmId, updateDto);

    this.created(res, fillDTO(UploadImageResponse, updateDto));
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

    this.ok(res, fillDTO(FilmFullResponse, film));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;
    const film = await this.filmService.deleteById(filmId);

    await this.commentService.deleteByFilmId(film?.id);

    this.noContent(res, fillDTO(FilmFullResponse, film));
  }
}
