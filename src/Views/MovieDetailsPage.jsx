import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MovieDetailsPage() {
  const location = useLocation();

  return (
    <>
      <Link to={location?.state?.from?.location ?? '/'} className="btn">
        {location?.state?.from?.lable ?? 'back to Home'}
      </Link>
      <h1>Hi I`m a movies page</h1>
    </>
  );
}

export default MovieDetailsPage;
