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
  IsOptional,
} from 'class-validator';

export default class UpdateFilmDto {
  @IsOptional()
  @MinLength(2, { message: 'Minimum name length must be 2' })
  @MaxLength(10, { message: 'Maximum name length must be 10' })
  public name!: string;

  @IsOptional()
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsOptional()
  @IsDateString({}, { message: 'created must be valid ISO date' })
  public created!: Date;

  @IsOptional()
  @IsEnum(Genres, { message: `type must be key of Genres: ${Genres.toString()}` })
  public genre!: Genres;

  @IsOptional()
  @IsInt({ message: 'released must be an integer' })
  public released!: number;

  @IsOptional()
  @MaxLength(256, { message: 'Too short for field posterImage' })
  public posterImage!: string;

  @IsOptional()
  @MaxLength(256, { message: 'Too short for field backgroundImage' })
  public backgroundImage!: string;

  @IsOptional()
  @IsHexColor()
  public backgroundColor!: string;

  @IsOptional()
  @MaxLength(256, { message: 'Too short for field videoLink' })
  public videoLink!: string;

  @IsOptional()
  @MaxLength(256, { message: 'Too short for field previewVideoLink' })
  public previewVideoLink!: string;

  @IsOptional()
  @Min(0, { message: 'Minimum rating must be 1' })
  @Max(10, { message: 'Maximum rating must be 10' })
  @IsInt({ message: 'rating must be an integer' })
  public rating!: number;

  @IsOptional()
  @MinLength(2, { message: 'Minimum director length must be 2' })
  @MaxLength(50, { message: 'Maximum director length must be 50' })
  public director!: string;

  @IsOptional()
  @IsArray({ message: 'Field starring must be an array' })
  @IsString({ each: true, message: 'starring field must be an array of valid id' })
  public starring!: string[];

  @IsOptional()
  @IsInt({ message: 'runTime must be an integer' })
  public runTime!: number;
}
