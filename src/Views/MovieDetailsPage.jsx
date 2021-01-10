import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  useParams,
  useLocation,
  useRouteMatch,
  NavLink,
  Route,
} from 'react-router-dom';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import Spiner from '../Components/Loader/Loader';
import { apiMovieDetails } from '../services/api/apiMovies';
import placeholder from '../img/film-placeholder.jpg';

const Cast = lazy(() =>
  import('../Views/Cast.jsx' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('./Reviews.jsx' /* webpackChunkName: "reviews" */),
);

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!movieId) {
      return;
    }

    setStatus(Status.PENDING);

    apiMovieDetails(movieId)
      .then(info => {
        setMovieDetails(info);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <div>
      {status === Status.RESOLVED && movieDetails && (
        <>
          <Link to={location?.state?.from?.location ?? '/'} className="btn">
            {location?.state?.from?.lable ?? 'go Home'}
          </Link>
          <div className="card">
            <img
              data-src={
                movieDetails.poster_path
                  ? `https://www.themoviedb.org/t/p/w500${movieDetails.poster_path}`
                  : placeholder
              }
              alt={movieDetails.title}
              height={480}
              width={320}
              className="lazyload posterImg"
            />
            <div className="details">
              <div className="description">
                <h1>
                  {movieDetails.title
                    ? movieDetails.title
                    : 'Title is comming...'}
                </h1>
                <p className="movieDetails">
                  <span className="movieDetails_subTitle">User score:</span>{' '}
                  {movieDetails.vote_average * 10 + '%'}
                </p>
                <p className="movieDetails">
                  <span className="movieDetails_subTitle">Overview:</span>{' '}
                  {movieDetails.overview
                    ? movieDetails.overview
                    : 'overview is comming soon'}
                </p>
                <span className="movieDetails_subTitle">Genres: </span>
                <ul className="genresList">
                  {movieDetails.genres.map(({ id, name }) => (
                    <li key={id}>
                      <i>{name} </i>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="additionalInfo">
                <h2>Additional information</h2>
                <ul className="additionalInfoList">
                  <li className="additionalInfoList_Item">
                    <NavLink
                      to={{
                        pathname: `${url}/cast`,
                        state: {
                          from: {
                            location: location?.state?.from?.location ?? '/',
                            lable: 'go back',
                          },
                        },
                      }}
                      className="additionalInfoList_menuItem"
                      activeClassName="additionalInfoList_menuItemActive"
                    >
                      <span>Cast </span>
                    </NavLink>
                  </li>
                  <li className="additionalInfoList_Item">
                    <NavLink
                      to={{
                        pathname: `${url}/reviews`,
                        state: {
                          from: {
                            location: location?.state?.from?.location ?? '/',
                            lable: 'go back',
                          },
                        },
                      }}
                      className="additionalInfoList_menuItem"
                      activeClassName="additionalInfoList_menuItemActive"
                    >
                      <span>Reviews</span>
                    </NavLink>
                  </li>
                </ul>

                <Suspense fallback={<h1>Загрузка підмаршруту</h1>}>
                  <Route path={`${url}/cast`}>
                    <Cast movieId={movieId} />
                  </Route>
                </Suspense>

                <Suspense fallback={<h1>Загрузка підмаршруту</h1>}>
                  <Route path={`${url}/reviews`}>
                    <Reviews movieId={movieId} />
                  </Route>
                </Suspense>
              </div>
            </div>
          </div>
        </>
      )}

      {status === Status.RESOLVED && movieDetails && <ScrollUpButton />}
      {status === Status.PENDING && <Spiner />}
    </div>
  );
}

export default MovieDetailsPage;
