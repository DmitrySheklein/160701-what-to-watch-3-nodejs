import UserWithTokenDto from '../../dto/user/user-with-token.dto.js';
import UserDto from '../../dto/user/user.dto.js';
import { LoggedUser, User } from '../../types/user.js';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.firstname,
  avatarUrl: user.avatarPath,
  email: user.email,
});

export const adaptLoginToClient = (user: UserWithTokenDto): LoggedUser => ({
  name: user.firstname,
  email: user.email,
  avatarUrl: user.avatarPath,
  token: user.token,
});
