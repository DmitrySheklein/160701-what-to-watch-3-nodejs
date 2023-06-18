import { createSelector } from '@reduxjs/toolkit';
import { State, FilmState } from '../../types/state';
import { NameSpace } from '../../const';

export const getActiveFilm = createSelector(
  (state: State) => state[NameSpace.Film],
  (state: FilmState) => state.film
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Film],
  (state: FilmState) => state.isLoading
);

export const getIsFavorite = createSelector(
  (state: State) => state[NameSpace.Film],
  (state: FilmState) => state.film?.isFavorite ?? false
);
