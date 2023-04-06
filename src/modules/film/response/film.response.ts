import { Expose } from 'class-transformer';
import { Genres } from '../../../types/film.type.js';

export default class FilmResponse {
  @Expose()
  public _id!: string;

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

  @Expose()
  public userId!: string;
}
