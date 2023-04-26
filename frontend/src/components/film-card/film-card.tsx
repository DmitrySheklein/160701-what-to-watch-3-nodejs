import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
  withVideo: boolean;
};

function FilmCard({ film, withVideo }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { name, posterImage, id, previewVideoLink } = film;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {withVideo && isPlaying ? (
        <Link to={`${AppRoute.Film}/${id}`}>
          <video src={previewVideoLink} loop autoPlay muted width="280" height="175" />
        </Link>
      ) : (
        <>
          <Link to={`${AppRoute.Film}/${id}`}>
            <div className="small-film-card__image">
              <img src={posterImage} alt={name} />
            </div>
          </Link>
          <h3 className="small-film-card__title">
            <Link
              className="small-film-card__link"
              to={`${AppRoute.Film}/${id}`}
            >
              {name}
            </Link>
          </h3>
        </>
      )}
    </article>
  );
}

export default FilmCard;
