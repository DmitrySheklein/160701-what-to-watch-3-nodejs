import { inject, injectable } from 'inversify';
import { CommentServiceInterface } from './comment-service.interface.js';
import { Component } from '../../types/component.types.js';
import { CommentEntity } from './comment.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constant.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {}

  public async create(filmId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.filmService.incCommentCount(filmId, dto.rating);

    return comment.populate(['userId']);
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({ filmId })
      .sort({ postDate: SortType.Down })
      .limit(DEFAULT_COMMENT_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async deleteByFilmId(filmId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ filmId }).exec();

    return result.deletedCount;
  }
}
