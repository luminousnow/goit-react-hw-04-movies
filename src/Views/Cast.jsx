import React, { useState, useEffect } from 'react';
import { apiCast } from '../services/api/apiMovies';
import personPlaceholder from '../img/person-placeholder.jpg';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';

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

  return (
    <div>
      {status === Status.RESOLVED && cast === 0 && `We can't find any actors`}
      {status === Status.RESOLVED && cast && (
        <CarouselProvider
          visibleSlides={6}
          step={6}
          naturalSlideWidth={150}
          naturalSlideHeight={350}
          totalSlides={cast.length}
          infinite
        >
          <div className="caruselBtn">
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </div>
          <Slider>
            {cast.map(({ id, name, character, profile_path, popularity }) => (
              <Slide key={id}>
                <img
                  data-src={
                    profile_path
                      ? `https://www.themoviedb.org/t/p/w138_and_h175_face${profile_path}`
                      : personPlaceholder
                  }
                  alt={name}
                  height={180}
                  width={138}
                  className="lazyload posterImg"
                />
                <div className="authorInfo">
                  <h3 className="actorName">
                    A review by {name ? name : 'Good boy :)'}
                  </h3>
                  <p className="actorCharacter">
                    {character ? character : 'Good boy :)'}
                  </p>
                </div>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      )}

      {status === Status.PENDING && 'Searching & loading cast...'}
      {status === Status.REJECTED && `We can't find any actors`}
    </div>
  );
}

export default Cast;
