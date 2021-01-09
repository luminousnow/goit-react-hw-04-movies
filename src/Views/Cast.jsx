import { useState, useEffect } from 'react';
import { apiCast } from '../services/api/apiMovies';
import personPlaceholder from '../img/person-placeholder.jpg';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    setStatus(Status.PENDING);

    apiCast(movieId)
      .then(({ cast }) => {
        setCast(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  console.log(cast);

  return (
    <div>
      {status === Status.RESOLVED && cast === 0 && `We can't find any actors`}

      {status === Status.RESOLVED && cast && (
        <ul className="castList">
          {cast.map(({ id, name, character, profile_path, popularity }) => (
            <li
              key={id}
              // actorName={name}
              // character={character}
              // photo={profile_path}
              // popularity={popularity}
              // className="castList_Item"
            >
              <img
                data-src={
                  profile_path
                    ? `https://www.themoviedb.org/t/p/w138_and_h175_face${profile_path}`
                    : personPlaceholder
                }
                alt={name}
                height={270}
                width={140}
                className="lazyload posterImg"
              />
              <div className="authorInfo">
                <h3 className="actorName">
                  A review by {name ? name : 'Good boy :)'}
                </h3>
                <p className="actorCharacter">
                  {character ? character : 'Good boy :)'}
                </p>
                <p className="actorPopularity">{popularity ? popularity : 0}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {status === Status.PENDING && 'Searching & loading cast...'}
      {status === Status.REJECTED && `We can't find any actors`}
    </div>
  );
}

export default Cast;
