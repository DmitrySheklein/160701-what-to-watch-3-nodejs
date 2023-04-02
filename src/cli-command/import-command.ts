// npm run ts ./src/cli.ts -- --import ./mock/mock-data.tsv admin test 127.0.0.1 course-njs3 secret
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { FilmServiceInterface } from '../modules/film/film-service.interface.js';
import { FilmModel } from '../modules/film/film.entity.js';
import FilmService from '../modules/film/film.service.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import UserService from '../modules/user/user.service.js';
import { Film } from '../types/film.type.js';
import { createFilm, getErrorMessage } from '../utils/common.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { getUri } from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private filmService!: FilmServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLineRead = this.onLineRead.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.filmService = new FilmService(this.logger, FilmModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveFilm(film: Film) {
    const user = await this.userService.findOrCreate(
      {
        ...film.user,
        //TODO импорт реального пароля пользователя
        password: /* film.user.password  || */ DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    await this.filmService.create({
      ...film,
      userId: user.id,
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> {
    try {
      if (!filename || filename.trim() === '') {
        throw new Error('Не передан путь до файла');
      }
      const uri = getUri(login, password, host, DEFAULT_DB_PORT, dbname);

      this.salt = salt;

      await this.databaseService.connect(uri);

      const fileReader = new TSVFileReader(filename.trim());
      fileReader.on('lineread', this.onLineRead);
      fileReader.on('end', this.onComplete);

      await fileReader.read();
    } catch (error) {
      console.log(`Can't read the file: ${getErrorMessage(error)}`);
    }
  }

  private async onLineRead(line: string, resolve: () => void) {
    const film = createFilm(line);
    await this.saveFilm(film);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
    this.databaseService.disconnect();
  }
}
