import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentResponse {
  @Expose({ name: '_id' })
  public id!: string;

  @Expose()
  public message!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt' })
  public postDate!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
