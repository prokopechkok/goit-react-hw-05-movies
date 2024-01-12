import axios from 'axios';
import { AUTH_TOKEN } from 'utils/constants';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const requestTrendingMovies = async () => {
  const url = '/trending/movie/day?language=en-US';
  const { data } = await axios.get(url);

  return data.results;
};

export const requestMovieById = async movieId => {
  const url = `/movie/${movieId}?language=en-US`;
  const { data } = await axios.get(url);

  return data;
};

export const requestMovieByQuery = async searchQuery => {
  const url = `/search/movie?query=${searchQuery}`;
  const { data } = await axios.get(url);

  return data.results;
};

export const requestMovieCast = async movieId => {
  const url = `/movie/${movieId}/credits?language=en-US`;
  const { data } = await axios.get(url);

  return data.cast;
};

export const requestReviews = async movieId => {
  const url = `/movie/${movieId}/reviews?language=en-US`;
  const { data } = await axios.get(url);

  return data.results;
};
