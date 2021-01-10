import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Appbar from '../Appbar/Appbar';
import NotFoundPage from '../../Views/NotFoundPage';

const HomePage = lazy(() =>
  import('../../Views/HomePage.jsx' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../../Views/MoviesPage.jsx' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../Views/MovieDetailsPage.jsx' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback={<h1>Загрузка маршруту</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>

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
