import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import RegisterPage from '../../pages/register-page/register-page';
import AddFilmPage from '../../pages/add-film-page/add-film-page';
import EditFilmPage from '../../pages/edit-film-page/edit-film-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/';
import { checkAuth } from '../../store/api-actions';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyListPage />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.Player}/:id`} element={<PlayerPage />} />
      <Route path={`${AppRoute.Film}/:id`}>
        <Route index element={<FilmPage />} />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.EditFilm}
          element={
            <PrivateRoute>
              <EditFilmPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path={AppRoute.Register} element={<RegisterPage />} />
      <Route
        path={AppRoute.AddFilm}
        element={
          <PrivateRoute>
            <AddFilmPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
