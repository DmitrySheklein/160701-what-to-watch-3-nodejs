import { useEffect } from 'react';
import Spinner from '../spinner/spinner';
import { getReviews, getIsLoading } from '../../store/reviews-data/selectors';
import { fetchReviews } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { formatReviewDate } from '../../util';

type TabReviewsProps = {
  id: string;
};

function TabReviews({ id }: TabReviewsProps) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map(({ comment, user, date, rating, id: reviewId }) => (
          <div key={reviewId} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment}</p>

              <footer className="review__details">
                <cite className="review__author">{user.name}</cite>
                <time className="review__date" dateTime={date}>
                  {formatReviewDate(date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabReviews;
