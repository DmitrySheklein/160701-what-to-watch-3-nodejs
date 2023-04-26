import { createSelector } from '@reduxjs/toolkit';
import { State, GenreState } from '../../types/state';
import { NameSpace } from '../../const';

export const getActiveGenre = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.activeGenre
);

export const getFilmsByGenre = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.filmsByGenre
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.isLoading
);
