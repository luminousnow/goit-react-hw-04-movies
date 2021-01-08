import {
  apiTrending,
  apiQuerySearching,
  apiMovieDetails,
  apiCast,
  apiReviews,
} from '../../services/api/apiMovies';

import { ToastContainer, toast } from 'react-toastify';
import NotFoundPage from '../../Views/NotFoundPage';
import HomePage from '../../Views/HomePage';
import { Container } from 'semantic-ui-react';
import Appbar from '../Appbar/Appbar';
import { Route, Switch } from 'react-router-dom';
import MoviesPage from '../../Views/MoviesPage';
import MovieDetailsPage from '../../Views/MovieDetailsPage';

function App() {
  // apiQuerySearching('cat');
  // apiMovieDetails(464052);
  // apiCast(464052);
  // apiReviews(464052);
  return (
    <Container>
      <Appbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {/* <Route path="/:moviesId">
          <MovieDetailsPage />
        </Route> */}

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:moviesId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default App;
