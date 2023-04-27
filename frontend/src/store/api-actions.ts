import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film, FullFilm } from '../types/film';
import { Review } from '../types/review';
import { NewReview } from '../types/new-review';
import { AuthData } from '../types/auth-data';
import { Token } from '../types/token';
import { NewFilm } from '../types/new-film';
import { APIRoute, DEFAULT_GENRE, NameSpace } from '../const';
import { User } from '../types/user';
import { NewUser } from '../types/new-user';
import { dropToken, saveToken } from '../services/token';
import {
  adaptCommentsToClient,
  adaptFilmToClient,
  adaptFilmsToClient,
  adaptUserToClient,
} from '../utils/adapters/adaptersToClient';
import UserDto from '../dto/user/user.dto';
import CreateUserWithIdDto from '../dto/user/create-user-with-id.dto';
import { adaptAvatarToServer, adaptSignupToServer } from '../utils/adapters/adaptersToServer';
import StatusCodes from 'http-status-codes';
import UserWithTokenDto from '../dto/user/user-with-token.dto.js';
import FilmDto from '../dto/film/film.dto';
import FilmFullDto from '../dto/film/film-full.dto';
import CommentDto from '../dto/comment/comment.dto';

type Extra = {
  api: AxiosInstance;
};

export const fetchFilms = createAsyncThunk<Film[], undefined, { extra: Extra }>(
  `${NameSpace.Films}/fetchFilms`,
  async (_arg, { extra: { api } }) => {
    const { data } = await api.get<FilmDto[]>(APIRoute.Films);

    return adaptFilmsToClient(data);
  },
);

export const fetchFilmsByGenre = createAsyncThunk<Film[], undefined, { extra: Extra }>(
  `${NameSpace.Genre}/fetchFilmsByGenre`,
  async (genre, { extra }) => {
    const { api } = extra;
    let route = `${APIRoute.Genre}/${genre}`;
    if (genre === DEFAULT_GENRE) {
      route = APIRoute.Films;
    }
    const { data } = await api.get<FilmDto[]>(route);

    return adaptFilmsToClient(data);
  },
);

export const fetchFilm = createAsyncThunk<FullFilm, undefined, { extra: Extra }>(
  `${NameSpace.Film}/fetchFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmFullDto>(`${APIRoute.Films}/${id}`);

    return adaptFilmToClient(data);
  },
);

export const editFilm = createAsyncThunk<Film, Film, { extra: Extra }>(
  `${NameSpace.Film}/editFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<Film>(`${APIRoute.Films}/${filmData.id}`, filmData);

    return data;
  },
);

export const addFilm = createAsyncThunk<Film, NewFilm, { extra: Extra }>(
  `${NameSpace.Film}/addFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<FilmFullDto>(APIRoute.Films, filmData);

    return adaptFilmToClient(data);
  },
);

export const deleteFilm = createAsyncThunk<Film, string, { extra: Extra }>(
  `${NameSpace.Film}/deleteFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.delete<Film>(`${APIRoute.Films}/${id}`);

    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, { extra: Extra }>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CommentDto[]>(`${APIRoute.Comments}/${id}`);

    return adaptCommentsToClient(data);
  },
);

export const postReview = createAsyncThunk<Review, { id: Review['id']; review: NewReview }, { extra: Extra }>(
  `${NameSpace.Reviews}/postReview`,
  async ({ id, review }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${id}`, review);

    return data;
  },
);

export const checkAuth = createAsyncThunk<User, undefined, { extra: Extra }>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra }) => {
    const { api } = extra;
    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      dropToken();
      return Promise.reject(error);
    }
  },
);

export const login = createAsyncThunk<any, AuthData, { extra: Extra }>(
  `${NameSpace.User}/login`,
  async (authData, { extra }) => {
    const { api } = extra;

    const { data } = await api.post<UserWithTokenDto>(APIRoute.Login, authData);
    const { token } = data;

    if (token) {
      saveToken(token);
    }

    return data;
  },
);

export const registerUser = createAsyncThunk<void, NewUser, { extra: Extra }>(
  `${NameSpace.User}/register`,
  async (userData, { extra }) => {
    const { api } = extra;
    const postData = await api.post<CreateUserWithIdDto>(
      APIRoute.Register,
      adaptSignupToServer({
        ...userData,
      }),
    );

    if (postData.status === StatusCodes.CREATED) {
      await api.post(`${APIRoute.Avatar}`, adaptAvatarToServer(userData.avatar), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { extra: Extra }>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra }) => {
    // const { api } = extra;
    // await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, { extra: Extra }>(
  `${NameSpace.FavoriteFilms}/fetchFavoriteFilms`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmDto[]>(APIRoute.Favorite);

    return adaptFilmsToClient(data);
  },
);

export const fetchPromo = createAsyncThunk<FullFilm, undefined, { extra: Extra }>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmFullDto>(APIRoute.Promo);

    return adaptFilmToClient(data);
  },
);

export const setFavorite = createAsyncThunk<Film, Film['id'], { extra: Extra }>(
  `${NameSpace.FavoriteFilms}/setFavorite`,
  async (filmId, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Film>(`${APIRoute.Favorite}/${filmId}/1`);

    return data;
  },
);

export const unsetFavorite = createAsyncThunk<Film, Film['id'], { extra: Extra }>(
  `${NameSpace.FavoriteFilms}/unsetFavorite`,
  async (filmId, { extra }) => {
    const { api } = extra;
    const { data } = await api.delete<Film>(`${APIRoute.Favorite}/${filmId}/0`);

    return data;
  },
);
