import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import LoggerServise from '../../common/logger/logger.service.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/common.js';
import { CommentServiceInterface, FavoriteServiceInterface } from './favorite-service.interface.js';
import ChangeFavoriteDto from './dto/change-favorite.dto.js';

import * as core from 'express-serve-static-core';
import CommentResponse from './response/comment.response.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';

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
      path: '/:filmId/:status',
      method: HttpMethod.Post,
      handler: this.change,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(ChangeFavoriteDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const userId = 'sfsfsfd';
    const filmsId = await this.favoriteService.find(userId);

    this.ok(res, filmsId);
  }

  // public async change(
  //   {
  //     params,
  //     body,
  //   }: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, ChangeFavoriteDto>,
  //   res: Response,
  // ): Promise<void> {
  //   const { filmId } = params;

  //   const userId = '642b1589f2a7670b6d002993';
  //   // if (!userId) {
  //   //   throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can create film', 'FilmController');
  //   // }

  //   const comment = await this.commentService.create({
  //     ...body,
  //     filmId,
  //     userId,
  //   });

  //   this.created(res, fillDTO(CommentResponse, comment));
  // }
}
