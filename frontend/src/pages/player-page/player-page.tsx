import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import VideoPlayer from '../../components/video-player/video-player';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getActiveFilm, getIsLoading } from '../../store/film-data/selectors';
import { fetchFilm } from '../../store/api-actions';

function PlayerPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const film = useAppSelector(getActiveFilm);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (id !== film?.id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id, film?.id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (film) {
    return <VideoPlayer film={film} />;
  }

  return <NotFoundPage />;
}

export default PlayerPage;
