import { Loader } from 'components/loader/Loader';
import { MoviesList } from 'components/moviesList/MoviesList';
import React, { useEffect, useState } from 'react';
import { requestTrendingMovies } from 'services/api';

const Home = async () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const trendingMovies = await requestTrendingMovies({
          signal: abortController.signal,
        });
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {isLoading && <Loader />}
      {error && (
        <p>
          Sorry... Some error occured while loading movies. Please try again
          later.
        </p>
      )}
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};

export default Home;
