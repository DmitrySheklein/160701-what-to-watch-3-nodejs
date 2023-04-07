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
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { FilmServiceInterface } from '../film/film-service.interface.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerServise,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register router for CommentController');

    this.addRoute({ path: '/:filmId', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:filmId', method: HttpMethod.Post, handler: this.create });
  }

  public async index(
    { params }: Request<core.ParamsDictionary, unknown, unknown>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;

    if (!(await this.filmService.exists(filmId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Film with id ${filmId} not found.`, 'CommentController');
    }

    const comment = await this.commentService.findByFilmId(filmId);

    this.ok(res, fillDTO(CommentResponse, comment));
  }

  public async create(
    {
      params,
      body,
    }: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    const { filmId } = params;

    // if (!userId) {
    //   throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only auth user can create film', 'FilmController');
    // }

    if (!(await this.filmService.exists(filmId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Film with id ${filmId} not found.`, 'CommentController');
    }

    const comment = await this.commentService.create({
      ...body,
      userId: '642b1589f2a7670b6d002993',
      filmId,
    });

    this.created(res, fillDTO(CommentResponse, comment));
  }
}
