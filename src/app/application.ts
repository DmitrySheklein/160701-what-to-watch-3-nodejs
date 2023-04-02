import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ConfigService from '../common/config/config.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.types.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getUri } from '../utils/db.js';
// import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
// import { FilmServiceInterface } from '../modules/film/film-service.interface.js';
import express, { Express } from 'express';
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
import { FilmServiceInterface } from '../modules/film/film-service.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.FilmServiceInterface) private filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface,
    @inject(Component.UserServiceInterface) private userService: UserServiceInterface,
    @inject(Component.FilmController) private filmController: ControllerInterface,
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/films', this.filmController.router);
  }

  public async init() {
    this.logger.info('App init');
    this.logger.info(`Get value from env $PORT ${this.config.get('PORT')}`);

    const uri = getUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);
    this.userService.findByEmail('sfsf@sgsgsg.ru');
    this.initRoutes();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
    const comment = await this.commentService.create({
      message: `My comment ${new Date().toISOString()}`,
      rating: 10,
      postDate: new Date(),
      userId: '64203e5cc388ef9e7d53e35d',
      filmId: '642050e07a0ba612a72c199b',
    });
    console.log(comment);
    const c = await this.commentService.findByFilmId('64203e5cc388ef9e7d53e35f');
    console.log(c);
    const f = await this.filmService.find(2);
    console.log(f);
  }
}
