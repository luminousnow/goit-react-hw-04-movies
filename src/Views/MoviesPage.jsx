import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import Button from '../Components/Button/Button';
import Spiner from '../Components/Loader/Loader';
import Searchbar from '../Components/Searchbar';
import { apiQuerySearching } from '../services/api/apiMovies';
import placeholder from '../img/film-placeholder.jpg';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [moviesCollection, setMoviesCollection] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const searchQuery =
    new URLSearchParams(location.search).get('query') ?? query;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus(Status.PENDING);

    apiQuerySearching(searchQuery, page)
      .then(collection => {
        setMoviesCollection(prevState => [...prevState, ...collection.results]);

        setStatus(Status.RESOLVED);

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        setError(error);

        setStatus(Status.REJECTED);
      });
  }, [page, searchQuery]);

  const getQuery = query => {
    setQuery(query);
  };

  const resetState = () => {
    setPage(1);
    setMoviesCollection([]);
  };

  const onSearchHandlerChange = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  const onLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar
        getQuery={getQuery}
        resetState={resetState}
        onSearchHandlerChange={onSearchHandlerChange}
      />
      {status === Status.IDLE && (
        <div className="idle">Напиши назву і запусти пошук!✨</div>
      )}
      {status === Status.RESOLVED && moviesCollection.length === 0 && (
        <p className="resolved">ОУу...спробуй ввести іншу назву</p>
      )}
      {status === Status.RESOLVED && moviesCollection && (
        <ul className="gallery">
          {moviesCollection.map(
            ({ id, poster_path, title, vote_average, overview }) => (
              <li
                key={id}
                title={title}
                vote_average={vote_average}
                overview={overview}
                className="galleryItem"
              >
                <Link
                  to={{
                    pathname: `${url}/${id}`,
                    state: {
                      from: { location, lable: 'go back' },
                    },
                  }}
                  className="gallerylink"
                >
                  <img
                    data-src={
                      poster_path
                        ? `https://www.themoviedb.org/t/p/w500${poster_path}`
                        : placeholder
                    }
                    alt={title}
                    height={480}
                    width={320}
                    className="lazyload"
                  />
                  <h1 className="galleryTitle">
                    {title ? title : 'Title is comming...'}
                  </h1>
                  <p className="galleryVote">{vote_average * 10 + '%'}</p>
                  <p className="galleryOverview">
                    {overview ? overview : 'overview is comming soon'}
                  </p>
                </Link>
              </li>
            ),
          )}
        </ul>
      )}

      {status === Status.RESOLVED && moviesCollection && <ScrollUpButton />}
      {status === Status.PENDING && <Spiner />}
      {status === Status.RESOLVED && moviesCollection.length > 19 && (
        <Button onLoadMoreBtnClick={onLoadMoreBtnClick} status={status} />
      )}
    </div>
  );
}

export default MoviesPage;
