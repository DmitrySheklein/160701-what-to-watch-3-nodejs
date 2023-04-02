import { Expose } from 'class-transformer';

export default class FilmResponse {
  @Expose()
  public _id!: string;

  @Expose()
  public name!: string;
}
