import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import LoggerServise from '../../common/logger/logger.service.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/common.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { ParamsGetFilm } from '../film/film.controller.js';
import * as core from 'express-serve-static-core';
import CommentResponse from './response/comment.response.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerServise,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register router for CommentController');

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ],
    });
  }

  public async index(
    { params }: Request<core.ParamsDictionary, unknown, unknown>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;

    const comment = await this.commentService.findByFilmId(filmId);

    this.ok(res, fillDTO(CommentResponse, comment));
  }

  public async create(
    req: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    const { body } = req;
    const { filmId } = req.params;
    const userId = req.user.id;

    const comment = await this.commentService.create({
      ...body,
      filmId,
      userId,
    });
    await this.filmService.incCommentCount(filmId, body.rating);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
