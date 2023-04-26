import { IsString, Length, IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min firstname length is 1, max is 15' })
  public firstname?: string;

  @IsOptional()
  @IsString({ message: 'avatarPath is required' })
  public avatarPath?: string;
}
