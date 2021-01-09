import { useState, useEffect } from 'react';
import { apiReviews } from '../services/api/apiMovies';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    setStatus(Status.PENDING);

    apiReviews(movieId)
      .then(({ results }) => {
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <div>
      {status === Status.RESOLVED &&
        reviews.length === 0 &&
        `We don't have any reviews for this movie`}

      {status === Status.RESOLVED && reviews && (
        <ul className="reviewsList">
          {reviews.map(
            ({ id, author, author_details, content, created_at }) => (
              <li key={id} className="reviewsList_Item">
                <div className="authorTitle">
                  <h3 className="authorName">
                    A review by {author ? author : 'Anonymous'}
                  </h3>
                  <p className="authorRating">
                    {author_details.rating ? author_details.rating : 0}
                  </p>
                  <p className="authorCreated">
                    at {created_at ? created_at : ''}
                  </p>
                </div>
                <p className="authorContent">{content ? content : ''}</p>
              </li>
            ),
          )}
        </ul>
      )}

      {status === Status.PENDING && 'Searching & loading reviews...'}
      {status === Status.REJECTED && `We don't have any reviews for this movie`}
    </div>
  );
}

export default Reviews;
