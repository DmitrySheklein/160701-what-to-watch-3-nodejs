import UserDto from '../user/user.dto.js';
import { Genres } from './create-film.dto.js';

export default class FilmFullDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public created!: Date;

  public genre!: Genres;

  public released!: number;

  public backgroundImage!: string;

  public backgroundColor!: string;

  public videoLink!: string;

  public previewVideoLink!: string;

  public rating!: number;

  public director!: string;

  public starring!: string[];

  public runTime!: number;

  public posterImage!: string;

  public commentCount!: number;

  public user!: UserDto;

  public isFavorite!: boolean;
}
