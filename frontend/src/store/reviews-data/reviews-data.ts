import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SubmitStatus } from '../../const';
import { ReviewsState } from '../../types/state';
import { fetchReviews, postReview } from '../api-actions';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  submitStatus: SubmitStatus.Still,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postReview.pending, (state) => {
        state.submitStatus = SubmitStatus.Pending;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.submitStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postReview.rejected, (state) => {
        state.submitStatus = SubmitStatus.Rejected;
      });
  },
});
