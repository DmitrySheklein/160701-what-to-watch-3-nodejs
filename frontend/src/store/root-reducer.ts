import { combineReducers } from 'redux';
import { filmsData } from './films-data/films-data';
import { genreData } from './genre-data/genre-data';
import { filmData } from './film-data/film-data';
import { userData } from './user-data/user-data';
import { reviewsData } from './reviews-data/reviews-data';
import { favoriteFilmsData } from './favorite-films-data/favorite-films-data';
import { promoData } from './promo-data/promo-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.Genre]: genreData.reducer,
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.FavoriteFilms]: favoriteFilmsData.reducer,
  [NameSpace.Promo]: promoData.reducer,
});
