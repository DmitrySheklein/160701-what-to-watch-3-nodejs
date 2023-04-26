import { useState } from 'react';
import Rating from '../rating/rating';
import { NewReview } from '../../types/new-review';

const Limit = {
  MIN: 50,
  MAX: 300,
};

type AddReviewFormProps = {
  onSubmit: (review: NewReview) => void;
};

function AddReviewForm({ onSubmit }: AddReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const isValid =
    rating && comment.length >= Limit.MIN && comment.length <= Limit.MAX;

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit({ rating, comment });
        }}
      >
        <Rating onChange={setRating} currentRating={rating} />

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={comment}
            onChange={(evt) => setComment(evt.target.value)}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!isValid}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
