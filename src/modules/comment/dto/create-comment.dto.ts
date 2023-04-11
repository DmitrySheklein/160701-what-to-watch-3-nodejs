import { IsString, Length, IsMongoId, Min, Max, IsInt } from 'class-validator';
export default class CreateCommentDto {
  @IsString({ message: 'message is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public message!: string;

  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(10, { message: 'Maximum rating must be 10' })
  @IsInt({ message: 'rating must be an integer' })
  public rating!: number;

  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId!: string;

  @IsMongoId({ message: 'filmId field must be valid an id' })
  public filmId!: string;
}
