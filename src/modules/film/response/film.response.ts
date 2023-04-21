import { Expose, Type } from 'class-transformer';
import { Genres } from '../../../types/film.type.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {
  @Expose({ name: '_id' })
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public posterImage!: string;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public created!: Date;

  @Expose()
  public genre!: Genres;

  @Expose()
  public commentCount!: Genres;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public isFavorite!: boolean;
}
