import { DocumentType } from '@typegoose/typegoose';
import ChangeFavoriteDto from './dto/change-favorite.dto.js';
import { FavoriteEntity } from './favorite.entity.js';

export interface FavoriteServiceInterface {
  create(dto: ChangeFavoriteDto): Promise<DocumentType<FavoriteEntity>>;
  findAll(userId: string): Promise<(string | undefined)[] | null>;
  findByFilmId(filmId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null>;
  delete(filmId: string, userId: string): Promise<number | null>;
}
