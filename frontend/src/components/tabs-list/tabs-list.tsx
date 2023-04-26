import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import TabOverview from '../tab-overview/tab-overview';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import { Film } from '../../types/film';
import { Tab } from '../../const';

type TabsListProps = {
  film: Film;
};

function TabsList({ film }: TabsListProps) {
  const [searchParams] = useSearchParams();
  const searchTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    const isValidTab =
      searchTab && Object.values(Tab).some((value) => value === searchTab);
    if (isValidTab) {
      setActiveTab(searchTab);
    } else {
      setActiveTab(Tab.Overview);
    }
  }, [searchTab]);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.entries(Tab).map(([key, value]) => (
            <li
              key={key}
              className={cn('film-nav__item', {
                'film-nav__item--active': key === activeTab,
              })}
              onClick={() => setActiveTab(value)}
            >
              <Link to={`?tab=${value}`} className="film-nav__link">
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === Tab.Overview && <TabOverview film={film} />}
      {activeTab === Tab.Details && <TabDetails film={film} />}
      {activeTab === Tab.Reviews && <TabReviews id={film.id} />}
    </>
  );
}

export default TabsList;
