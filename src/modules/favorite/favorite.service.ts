import { inject, injectable } from 'inversify';
import { FavoriteServiceInterface } from './favorite-service.interface.js';
import { Component } from '../../types/component.types.js';
import { FavoriteEntity } from './favorite.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import ChangeFavoriteDto from './dto/change-favorite.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';

@injectable()
export default class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) {}

  public async create(dto: ChangeFavoriteDto): Promise<DocumentType<FavoriteEntity>> {
    const favorite = await this.favoriteModel.create(dto);
    this.logger.info(`New film added favorite: ${dto.filmId}`);

    return favorite;
  }

  public async findAll(userId: string): Promise<(string | undefined)[] | null> {
    const documents = await this.favoriteModel.find({ userId });
    const filmsId = documents.map((el) => el.filmId?.toString());

    return filmsId;
  }

  public async findByFilmId(filmId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null> {
    return this.favoriteModel.findOne({ filmId, userId }).exec();
  }

  public async delete(filmId: string, userId: string): Promise<number> {
    const result = await this.favoriteModel.deleteMany({ filmId, userId }).exec();

    return result.deletedCount;
  }
}
