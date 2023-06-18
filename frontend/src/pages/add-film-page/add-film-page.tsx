import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import AddFilmForm from '../../components/add-film-form/add-film-form';
import { NewFilm } from '../../types/new-film';
import { GENRES, AppRoute } from '../../const';
import { addFilm } from '../../store/api-actions';
import { getActiveFilm } from '../../store/film-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

const emptyFilm: NewFilm = {
  name: '',
  posterImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  director: '',
  starring: [],
  runTime: 0,
  genre: GENRES[0],
  released: 0,
};

function AddFilmPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeFilm = useAppSelector(getActiveFilm);

  const handleSubmit = useCallback(
    async (filmData: NewFilm) => {
      const response = await dispatch(addFilm(filmData));
      if (response.meta.requestStatus === 'rejected') {
        toast.error('Can\'t add film');
      } else if (activeFilm) {
        navigate(`${AppRoute.Film}/${activeFilm.id}`);
      }
    },
    [activeFilm, dispatch, navigate]
  );

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Add film</h1>
        <UserBlock />
      </header>
      <div className="sign-in user-page__content">
        <AddFilmForm film={emptyFilm} onSubmit={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
}

export default AddFilmPage;
