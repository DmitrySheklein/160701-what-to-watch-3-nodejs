import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { logout } from '../../store/api-actions';
import { getIsAuth, getUser } from '../../store/user-data/selectors';

function UserBlock() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const user = useAppSelector(getUser);

  const handleSignOutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <ul className="user-block">
      {isAuth && user ? (
        <>
          <li className="user-block__item">
            <button
              className="btn film-card__button"
              type="button"
              onClick={() => navigate(`${AppRoute.AddFilm}`)}
            >
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span>Add Film</span>
            </button>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.MyList}>
              <div className="user-block__avatar">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  width="63"
                  height="63"
                />
              </div>
            </Link>
          </li>
          <li className="user-block__item">
            <Link
              className="user-block__link"
              to={AppRoute.Main}
              onClick={handleSignOutClick}
            >
              Sign out
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.Login}>
              Sign in
            </Link>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.Register}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default UserBlock;
