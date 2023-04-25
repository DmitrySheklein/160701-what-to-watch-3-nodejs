import { Expose } from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  public email!: string;

  @Expose()
  public token!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public firstname!: string;
}
