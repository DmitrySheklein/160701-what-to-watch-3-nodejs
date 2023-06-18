import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import TabsList from '../../components/tabs-list/tabs-list';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import MyListButton from '../../components/my-list-button/my-list-button';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import {
  fetchFilm,
  fetchFilmsByGenre,
  deleteFilm,
} from '../../store/api-actions';
import {
  getActiveFilm,
  getIsLoading as getFilmIsLoading,
} from '../../store/film-data/selectors';
import {
  getFilmsByGenre,
  getIsLoading as getFilmsByGenreIsLoading,
} from '../../store/genre-data/selectors';
import { getIsAuth, getIsAuthor } from '../../store/user-data/selectors';

function FilmPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const film = useAppSelector(getActiveFilm);
  const isFilmLoading = useAppSelector(getFilmIsLoading);
  const similarFilms = useAppSelector(getFilmsByGenre);
  const isSimilarFilmsLoading = useAppSelector(getFilmsByGenreIsLoading);
  const isAuth = useAppSelector(getIsAuth);
  const isAuthor = useAppSelector((state) => getIsAuthor(state, film?.user));

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilm(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!film?.genre) {
      return;
    }

    dispatch(fetchFilmsByGenre(film.genre));
  }, [dispatch, film?.genre]);

  const handleDeleteClick = async () => {
    if (!id) {
      return;
    }

    dispatch(deleteFilm(id));
  };

  if (isFilmLoading || isSimilarFilmsLoading) {
    return <Spinner />;
  }

  if (!film || !id) {
    return <NotFoundPage />;
  }

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
    backgroundColor,
  } = film;

  return (
    <>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor }}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => navigate(`${AppRoute.Player}/${film.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {isAuth && <MyListButton id={id} />}
                {isAuth && (
                  <Link
                    to={`${AppRoute.Film}/${id}/${AppRoute.AddReview}`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
                {isAuthor && (
                  <>
                    <Link
                      to={`${AppRoute.Film}/${id}/${AppRoute.EditFilm}`}
                      className="btn film-card__button"
                    >
                      Edit Film
                    </Link>
                    <button
                      className="btn film-card__button"
                      type="button"
                      onClick={handleDeleteClick}
                    >
                      <span>Delete Film</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <TabsList film={film} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.slice(0, 4)} withVideo={false} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
