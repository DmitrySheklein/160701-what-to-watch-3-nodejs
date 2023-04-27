import UserDto from '../user/user.dto.js';
import { Genres } from './create-film.dto.js';

export default class FilmDto {
  public id!: string;

  public name!: string;

  public posterImage!: string;

  public previewVideoLink!: string;

  public created!: Date;

  public genre!: Genres;

  public commentCount!: number;

  public isFavorite!: boolean;

  public user!: UserDto;
}
