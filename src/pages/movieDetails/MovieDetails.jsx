import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Loader } from 'components/loader/Loader';

import { requestMovieById } from 'services/api';
import { IMAGE_URL_BASE } from 'utils/constants';
import default_image from '../../images/default-featured-image.png.jpg';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        const movieDetails = await requestMovieById(movieId);
        setMovie(movieDetails);
        setIsError(null);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const { title, overview, vote_average, release_date, genres, poster_path } =
    movie || {};

  const score = Math.round(Number(vote_average) * 10);
  const imagePath = poster_path
    ? `${IMAGE_URL_BASE}${poster_path}`
    : default_image;

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <p>
          Sorry... Some error occured while loading movie. Please try again
          later.
        </p>
      )}
      <div>
        {!isLoading && movie && (
          <div>
            <Link to={backLinkRef.current}>Go back</Link>
            <div>
              <img src={`${imagePath}`} alt={title} width="100" />
              <div>
                <h2>
                  {title} ({release_date.slice(0, 4)})
                </h2>
                <p>{`User score: ${score} %`}</p>
                <ul>
                  <li>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                  </li>
                  <li>
                    <h4>Genres</h4>
                    <p>{genres.map(({ name }) => name).join(' ')}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p>Additional information</p>
              <ul>
                <li>
                  <NavLink
                    to="cast"
                    state={{ ...location.state }}
                    className={({ isActive }) =>
                      `${css.detailsLink} ${isActive ? css.active : ''}`
                    }
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="reviews"
                    state={{ ...location.state }}
                    className={({ isActive }) =>
                      `${css.detailsLink} ${isActive ? css.active : ''}`
                    }
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetails;
