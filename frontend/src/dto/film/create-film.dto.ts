export enum Genres {
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Horror = 'Horror',
  Family = 'Family',
  Romance = 'Romance',
  Scifi = 'Scifi',
  Thriller = 'Thriller',
}
export default class CreateFilmDto {
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
}
