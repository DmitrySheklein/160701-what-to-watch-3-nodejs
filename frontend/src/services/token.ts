import { Token } from '../types/token';

const AUTH_TOKEN_KEY = 'wtw-token';

export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  return token ?? '';
};

export const saveToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
