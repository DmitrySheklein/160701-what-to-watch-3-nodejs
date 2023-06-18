import { store } from '../store/index';
import { Film, SmallFilm } from './film.js';
import { Review } from './review.js';
import { User } from './user.js';
import { AuthorizationStatus, SubmitStatus } from '../const';

export type FilmsState = {
  films: SmallFilm[];
  isLoading: boolean;
};

export type GenreState = {
  activeGenre: string;
  filmsByGenre: SmallFilm[];
  isLoading: boolean;
};

export type FilmState = {
  film: Film | null;
  isLoading: boolean;
};

export type FavoriteFilmsState = {
  favoriteFilms: SmallFilm[];
  isLoading: boolean;
};

export type PromoState = {
  promoFilm: Film | null;
  isLoading: boolean;
};

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  submitStatus: SubmitStatus;
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
