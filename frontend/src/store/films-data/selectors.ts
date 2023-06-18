import { createSelector } from '@reduxjs/toolkit';
import { State, FilmsState } from '../../types/state';
import { NameSpace } from '../../const';

export const getFilms = createSelector(
  (state: State) => state[NameSpace.Films],
  (state: FilmsState) => state.films
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Films],
  (state: FilmsState) => state.isLoading
);
