import { Container } from 'inversify';
import 'reflect-metadata';
import { Component } from './types/component.types.js';
import Application from './app/application.js';
import { applicationContainer } from './app/application.container.js';
import { userContainer } from './modules/user/user.container.js';
import { filmContainer } from './modules/film/film.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import { favoriteContainer } from './modules/favorite/favorite.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  filmContainer,
  commentContainer,
  favoriteContainer,
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
