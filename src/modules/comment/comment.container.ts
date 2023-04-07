import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.types.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CommentService from './comment.service.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { Container } from 'inversify';
import CommentController from './comment.controller.js';

const commentContainer = new Container();

commentContainer
  .bind<CommentServiceInterface>(Component.CommentServiceInterface)
  .to(CommentService)
  .inSingletonScope();
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
commentContainer
  .bind<CommentController>(Component.CommentController)
  .to(CommentController)
  .inSingletonScope();

export { commentContainer };
