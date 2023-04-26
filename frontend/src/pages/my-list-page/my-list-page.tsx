import { useEffect } from 'react';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Spinner from '../../components/spinner/spinner';
import {
  getFavoriteFilms,
  getIsLoading,
} from '../../store/favorite-films-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchFavoriteFilms } from '../../store/api-actions';

function MyListPage() {
  const dispatch = useAppDispatch();
  const myFilms = useAppSelector(getFavoriteFilms);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={myFilms} withVideo={false} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListPage;
