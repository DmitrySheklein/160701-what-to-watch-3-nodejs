import { Token } from './token';

export type User = {
  avatarUrl: string;
  email: string;
  name: string;
};
export type LoggedUser = {
  avatarUrl: string;
  email: string;
  name: string;
  token: Token;
};
