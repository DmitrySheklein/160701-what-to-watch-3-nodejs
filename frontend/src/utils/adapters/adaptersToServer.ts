import CreateUserDto from '../../dto/user/create-user.dto.js';
import { NewUser } from '../../types/new-user.js';

export const adaptSignupToServer = (user: NewUser): CreateUserDto => ({
  firstname: user.name,
  password: user.password,
  email: user.email,
  avatarPath: user.avatar,
});

export const adaptAvatarToServer = (file: File | undefined) => {
  const formData = new FormData();

  if (file) {
    formData.set('avatar', file);
  }

  return formData;
};
