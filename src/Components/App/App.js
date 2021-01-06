import s from './App.module.css';
import {
  apiTrending,
  apiQuerySearching,
  apiMovieDetails,
  apiCast,
  apiReviews,
} from '../../services/api/apiMovies';

function App() {
  apiTrending();
  apiQuerySearching('cat');
  apiMovieDetails(464052);
  apiCast(464052);
  apiReviews(464052);
  return <div className={s.app}></div>;
}

export default App;
