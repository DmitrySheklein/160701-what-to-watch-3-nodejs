import { createSelector } from '@reduxjs/toolkit';
import { State, FavoriteFilmsState } from '../../types/state';
import { NameSpace } from '../../const';

export const getFavoriteFilms = createSelector(
  (state: State) => state[NameSpace.FavoriteFilms],
  (state: FavoriteFilmsState) => state.favoriteFilms
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.FavoriteFilms],
  (state: FavoriteFilmsState) => state.isLoading
);
