import CommentDto from '../../dto/comment/comment.dto.js';
import FilmFullDto from '../../dto/film/film-full.dto.js';
import FilmDto from '../../dto/film/film.dto.js';
import UserWithTokenDto from '../../dto/user/user-with-token.dto.js';
import UserDto from '../../dto/user/user.dto.js';
import { Film, FullFilm } from '../../types/film.js';
import { Review } from '../../types/review.js';
import { LoggedUser, User } from '../../types/user.js';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.firstname,
  avatarUrl: user.avatarPath,
  email: user.email,
});

export const adaptLoginToClient = (user: UserWithTokenDto): LoggedUser => ({
  ...user,
  name: user.firstname,
  avatarUrl: user.avatarPath,
});

export const adaptFilmsToClient = (films: FilmDto[]): Film[] =>
  films
    .filter((film: FilmDto) => film.user !== null)
    .map((film: FilmDto) => ({
      ...film,
      user: adaptUserToClient(film.user),
    }));
export const adaptFilmToClient = (film: FilmFullDto): FullFilm => ({
  ...film,
  user: adaptUserToClient(film.user),
});

export const adaptCommentsToClient = (comments: CommentDto[]): Review[] =>
  comments
    .filter((comment: CommentDto) => comment.user !== null)
    .map((comment: CommentDto) => ({
      ...comment,
      comment: comment.message,
      date: comment.postDate,
      user: adaptUserToClient(comment.user),
    }));
