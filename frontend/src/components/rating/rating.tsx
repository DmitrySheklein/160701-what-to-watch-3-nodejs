import { Fragment } from 'react';

type RatingProps = {
  onChange: (rank: number) => void;
  currentRating: number;
};

function Rating({ onChange, currentRating }: RatingProps) {
  return (
    <div className="rating">
      <div className="rating__stars">
        {Array.from({ length: 10 }, (_, i) => {
          const rating = i + 1;
          return (
            <Fragment key={rating}>
              <input
                className="rating__input"
                id={`star-${rating}`}
                type="radio"
                name="rating"
                value={rating}
                onChange={() => onChange(rating)}
                checked={currentRating === rating}
              />
              <label className="rating__label" htmlFor={`star-${rating}`}>
                Rating {rating}
              </label>
            </Fragment>
          );
        }).reverse()}
      </div>
    </div>
  );
}

export default Rating;
