export default class CreateUserDto {
  public email!: string;

  public firstname!: string;

  public password!: string;

  public avatarPath!: File | undefined;
}
