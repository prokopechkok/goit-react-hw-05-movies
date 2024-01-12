import { Loader } from 'components/loader/Loader';
import { MoviesList } from 'components/moviesList/MoviesList';
import { SearchForm } from 'components/searchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { requestMovieByQuery } from 'services/api';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('sQuery') ?? '';

  useEffect(() => {
    if (!query) return;

    const getMoviesByQuery = async () => {
      try {
        setIsLoading(true);
        setIsError(null);

        const searchedMovies = await requestMovieByQuery(query);
        setMovies(searchedMovies);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
  }, [query]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <p>
          Sorry... Some error occured while loading movies. Please try again
          later.
        </p>
      )}
      <SearchForm />
      {movies && <MoviesList movies={movies} />}
    </div>
  );
};

export default Movies;
