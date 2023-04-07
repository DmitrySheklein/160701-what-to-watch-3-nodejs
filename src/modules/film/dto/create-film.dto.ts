import { Genres } from '../../../types/film.type.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsHexColor,
  IsInt,
  IsMongoId,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(2, { message: 'Minimum name length must be 2' })
  @MaxLength(10, { message: 'Maximum name length must be 10' })
  public name!: string;

  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'created must be valid ISO date' })
  public created!: Date;

  @IsEnum(Genres, { message: `type must be key of Genres: ${Genres.toString()}` })
  public genre!: Genres;

  @IsInt({ message: 'released must be an integer' })
  public released!: number;

  @MaxLength(256, { message: 'Too short for field posterImage' })
  public posterImage!: string;

  @MaxLength(256, { message: 'Too short for field backgroundImage' })
  public backgroundImage!: string;

  @IsHexColor()
  public backgroundColor!: string;

  @MaxLength(256, { message: 'Too short for field videoLink' })
  public videoLink!: string;

  @MaxLength(256, { message: 'Too short for field previewVideoLink' })
  public previewVideoLink!: string;

  @Min(0, { message: 'Minimum rating must be 1' })
  @Max(10, { message: 'Maximum rating must be 10' })
  @IsInt({ message: 'rating must be an integer' })
  public rating!: number;

  @MinLength(2, { message: 'Minimum director length must be 2' })
  @MaxLength(50, { message: 'Maximum director length must be 50' })
  public director!: string;

  @IsArray({ message: 'Field starring must be an array' })
  @IsString({ each: true, message: 'starring field must be an array of valid id' })
  public starring!: string[];

  @IsInt({ message: 'runTime must be an integer' })
  public runTime!: number;

  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId!: string;
}
