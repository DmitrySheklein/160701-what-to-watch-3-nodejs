import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { postReview, fetchFilm } from '../../store/api-actions';
import { NewReview } from '../../types/new-review';
import { getActiveFilm, getIsLoading } from '../../store/film-data/selectors';

function AddReviewPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const film = useAppSelector(getActiveFilm);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilm(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!film) {
    return <NotFoundPage />;
  }

  const handleReviewFormSubmit = async (review: NewReview) => {
    if (!id) {
      return;
    }

    const response = await dispatch(postReview({ id, review }));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t post review');
    } else {
      navigate(`${AppRoute.Film}/${id}?tab=Reviews`);
    }
  };

  const { backgroundImage, name, posterImage, backgroundColor } = film;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor }}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={`${AppRoute.Film}/${id}`}
                  className="breadcrumbs__link"
                >
                  {name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  to={`${AppRoute.Film}/${id}/${AppRoute.AddReview}`}
                  className="breadcrumbs__link"
                >
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm onSubmit={handleReviewFormSubmit} />
    </section>
  );
}

export default AddReviewPage;
