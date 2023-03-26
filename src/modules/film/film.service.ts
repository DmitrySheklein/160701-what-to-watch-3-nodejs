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
import { Genres } from '../../types/film.type.js';

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

    const customFilms = await this.filmModel
      .aggregate([
        {
          $project: {
            name: 1,
            created: 1,
            genre: 1,
            previewVideoLink: 1,
            commentCount: 1,
            posterImage: 1,
            userId: 1,
          },
        },
        { $limit: limit },
      ])
      .sort({ postDate: SortType.Down })
      .exec();

    await this.filmModel.populate(customFilms, {
      path: 'userId',
    });

    return customFilms;
  }

  public async deleteById(filmID: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndDelete(filmID).exec();
  }

  public async updateById(filmID: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmID, dto, { new: true }).populate(['userId']).exec();
  }

  public async findByGenre(
    genre: keyof typeof Genres,
    count?: number | undefined,
  ): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel
      .find({ genre: genre }, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(filmID: string, userRating: number): Promise<void> {
    const existFilm = await this.findById(filmID);

    if (!existFilm) {
      throw new Error(`The film with id: ${filmID} doesn't exist`);
    }
    const newRating = (existFilm.rating * existFilm.commentCount + userRating) / (existFilm.commentCount + 1);

    await this.filmModel
      .findByIdAndUpdate(filmID, {
        $inc: {
          commentCount: 1,
        },
        $set: {
          rating: newRating,
        },
      })
      .exec();
  }

  public async findPromo(): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne().populate(['userId']).exec();
  }

  public async findFavorite(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find().populate(['userId']).exec();
  }

  public async changeFavorite(filmId: string, status: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(
      filmId,
      {
        $set: {
          isFavorite: status,
        },
      },
      { new: true },
    );
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel.exists({ _id: documentId })) !== null;
  }
}
