import { useEffect, useState } from 'react';
import { requestTrendingMovies } from 'services/api';
import { MoviesList } from 'components/moviesList/MoviesList';
import { Loader } from 'components/loader/Loader';
// import { useLocation } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const trendingMovies = await requestTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {isLoading && <Loader />}
      {isError && (
        <p className={css.title}>
          Sorry... Some error occured while loading movies. Please try again
          later.
        </p>
      )}
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};

export default Home;
