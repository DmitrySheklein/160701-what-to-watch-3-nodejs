import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ConfigService from '../common/config/config.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.types.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getUri } from '../utils/db.js';
import express, { Express } from 'express';
// import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
// import { FilmServiceInterface } from '../modules/film/film-service.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    // @inject(Component.FilmServiceInterface) private filmService: FilmServiceInterface,
    // @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface,
    @inject(Component.UserServiceInterface) private userService: UserServiceInterface,
    @inject(Component.FilmController) private filmController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApp = express();
  }

  public initExeptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public initRoutes() {
    this.expressApp.use('/films', this.filmController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
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
    this.initMiddleware();
    this.initRoutes();
    this.initExeptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
