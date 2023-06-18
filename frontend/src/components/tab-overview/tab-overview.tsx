import { Film } from '../../types/film';
import { getRatingText } from '../../util';

type TabOverviewProps = {
  film: Film;
};

function TabOverview({ film }: TabOverviewProps) {
  const { rating, description, director, starring } = film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingText(rating)}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}

export default TabOverview;
