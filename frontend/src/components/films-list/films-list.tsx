import FilmCard from '../../components/film-card/film-card';
import { Film, SmallFilm } from '../../types/film';

type FilmsListProps = {
  films: SmallFilm[];
  withVideo: boolean;
};

function FilmsList({ films, withVideo }: FilmsListProps) {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} withVideo={withVideo} />
      ))}
    </div>
  );
}

export default FilmsList;
