import { DocumentType, types } from '@typegoose/typegoose';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { FilmEntity, FilmModel } from './film.entity.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_FILM_COUNT } from './film.constant.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>,
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await FilmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findById(filmId).populate(['userId']).exec();
  }

  public async find(count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel.find().sort({ postDate: SortType.Down }).limit(limit).populate(['userId']).exec();
  }

  public async deleteById(filmID: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndDelete(filmID).exec();
  }

  public async updateById(filmID: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmID, dto, { new: true }).populate(['userId']).exec();
  }

  public async findByGenre(genre: string, count?: number | undefined): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel
      .find({ genre: genre }, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(filmID: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmID, {
      $inc: {
        commentCount: 1,
      },
    });
  }

  //TODO отдать 1 промо фильм
  // public async findPromo(): Promise<DocumentType<FilmEntity>> {
  //   return this.filmModel.find().limit(1).populate(['userId']).exec();
  // }

  public async findFavorite(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find().populate(['userId']).exec();
  }

  public async changeFavorite(filmId: string, status: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmId, {
      $set: {
        isFavorite: status,
      },
    });
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel.exists({ _id: documentId })) !== null;
  }
}
