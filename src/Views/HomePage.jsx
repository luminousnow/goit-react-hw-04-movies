import React, { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import { apiTrending } from '../services/api/apiMovies';
import { Link } from 'react-router-dom';
import LoaderExampleInlineCentered from '../Components/Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function HomePage() {
  const [moviesCollection, setMoviesCollection] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!moviesCollection) {
      return;
    }

    setStatus(Status.PENDING);

    apiTrending(page)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
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
                <Link to={`/${id}`} className="gallerylink">
                  <img
                    data-src={`https://www.themoviedb.org/t/p/w1280${poster_path}`}
                    alt={title}
                    height={480}
                    width={320}
                    className="lazyload"
                  />
                  <h1 className="galleryTitle">{title}</h1>
                  <p className="galleryVote">{vote_average}</p>
                  {overview && <p className="galleryOverview">{overview}</p>}
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
      {status === Status.PENDING && <LoaderExampleInlineCentered />}
      {status === Status.RESOLVED && moviesCollection.length > 19 && (
        <Button onLoadMoreBtnClick={onLoadMoreBtnClick} status={status} />
      )}
    </div>
  );
}

export default HomePage;
