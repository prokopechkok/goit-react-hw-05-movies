import { Layout } from 'components/layout/Layout';
import Home from 'pages/home/Home';
import MovieDetails from 'pages/movieDetails/MovieDetails';
import Movies from 'pages/movies/Movies';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId/*" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
};
