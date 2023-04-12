import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import LoggerServise from '../../common/logger/logger.service.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { FavoriteServiceInterface } from './favorite-service.interface.js';
import * as core from 'express-serve-static-core';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { fillDTO } from '../../utils/common.js';
import FilmResponse from '../film/response/film.response.js';

type ParamsFavorite = {
  filmId: string;
};

@injectable()
export default class FavoriteController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerServise,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register router for FavoriteController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/:filmId/1',
      method: HttpMethod.Post,
      handler: this.add,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
    this.addRoute({
      path: '/:filmId/0',
      method: HttpMethod.Post,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const userId = '642b36edc14b6ec5a9da5b86';
    const filmsId = (await this.favoriteService.findAll(userId)) || [];
    const films = [];

    for (const id of filmsId) {
      if (id) {
        const film = await this.filmService.findById(id);
        films.push(film);
      }
    }

    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async add(
    { params }: Request<core.ParamsDictionary | ParamsFavorite, Record<string, unknown>, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const userId = '642b36edc14b6ec5a9da5b86';
    const { filmId } = params;
    const exist = await this.favoriteService.findByFilmId(filmId, userId);
    const film = await this.filmService.findById(filmId);

    if (!exist) {
      await this.favoriteService.create({
        filmId,
        userId,
      });

      this.created(res, fillDTO(FilmResponse, film));
    }

    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsFavorite, Record<string, unknown>, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const userId = '642b1589f2a7670b6d002993';
    const { filmId } = params;
    const exist = await this.favoriteService.findByFilmId(filmId, userId);
    const film = await this.filmService.findById(filmId);

    if (exist) {
      await this.favoriteService.delete(filmId, userId);
    }

    this.ok(res, fillDTO(FilmResponse, film));
  }
}
