import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from 'components/layout/Layout';

const Home = lazy(() => import('pages/home/Home'));
const MovieDetails = lazy(() => import('pages/movieDetails/MovieDetails'));
const Movies = lazy(() => import('pages/movies/Movies'));
const Cast = lazy(() => import('components/cast/Cast'));
const Reviews = lazy(() => import('components/reviews/Reviews'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
