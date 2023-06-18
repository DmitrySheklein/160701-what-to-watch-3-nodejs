import { createSelector } from '@reduxjs/toolkit';
import { State, PromoState } from '../../types/state';
import { NameSpace } from '../../const';

export const getPromoFilm = createSelector(
  (state: State) => state[NameSpace.Promo],
  (state: PromoState) => state.promoFilm
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Promo],
  (state: PromoState) => state.isLoading
);
