import { Container } from 'inversify';
import LoggerServise from '../common/logger/logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import ConfigService from '../common/config/config.service.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import { Component } from '../types/component.types.js';
import Application from '../app/application.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import ExceptionFilter from '../common/errors/exception-filter.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerServise).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer
  .bind<DatabaseInterface>(Component.DatabaseInterface)
  .to(DatabaseService)
  .inSingletonScope();
applicationContainer
  .bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface)
  .to(ExceptionFilter)
  .inSingletonScope();

export { applicationContainer };
