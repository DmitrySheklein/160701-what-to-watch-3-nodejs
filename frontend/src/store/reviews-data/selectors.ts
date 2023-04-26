import { createSelector } from '@reduxjs/toolkit';
import { State, ReviewsState } from '../../types/state';
import { NameSpace } from '../../const';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsState) => state.reviews
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsState) => state.isLoading
);
