export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  FilmServiceInterface: Symbol.for('FilmServiceInterface'),
  FilmModel: Symbol.for('FilmModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  FilmController: Symbol.for('FilmController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
