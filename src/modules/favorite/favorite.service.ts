import { inject, injectable } from 'inversify';
import { FavoriteServiceInterface } from './favorite-service.interface.js';
import { Component } from '../../types/component.types.js';
import { FavoriteEntity } from './favorite.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import ChangeFavoriteDto from './dto/change-favorite.dto.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) {}

  public async create(dto: ChangeFavoriteDto): Promise<DocumentType<FavoriteEntity>> {
    const favorite = await this.favoriteModel.create(dto);

    return favorite;
  }

  public async find(userId: string): Promise<string[] | null> {
    // return this.favoriteModel.find({ filmId, userId }).sort({ postDate: SortType.Down }).exec();
    return this.favoriteModel
      .find({ userId })
      .aggregate([
        { $sort: { postDate: SortType.Down } },
        {
          $project: {
            filmId: 1,
          },
        },
      ])
      .exec();
  }

  public async delete(filmId: string, userId: string): Promise<number> {
    const result = await this.favoriteModel.deleteMany({ filmId, userId }).exec();

    return result.deletedCount;
  }
}
