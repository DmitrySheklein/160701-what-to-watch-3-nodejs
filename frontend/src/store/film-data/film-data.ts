import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmState } from '../../types/state';
import { addFilm, deleteFilm, editFilm, fetchFilm, setFavorite, unsetFavorite } from '../api-actions';

const initialState: FilmState = {
  film: null,
  isLoading: false,
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.film = action.payload;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.film = action.payload;
      })
      .addCase(addFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.film = action.payload;
      })
      .addCase(editFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedFilm = action.payload;
        if (deletedFilm.id === state.film?.id) {
          state.film = null;
        }
      })
      .addCase(deleteFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(unsetFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
