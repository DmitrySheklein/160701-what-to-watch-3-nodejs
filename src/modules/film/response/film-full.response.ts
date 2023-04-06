import { Expose } from 'class-transformer';
import FilmResponse from './film.response.js';

export default class FilmFullResponse extends FilmResponse {
  @Expose()
  public created!: Date;

  @Expose()
  public released!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public director!: string;

  @Expose()
  public starring!: string[];

  @Expose()
  public runTime!: number;

  @Expose()
  public description!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;

  @Expose()
  public videoLink!: string;
}
