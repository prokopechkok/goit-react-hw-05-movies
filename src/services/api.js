import axios from 'axios';

export const requestTrendingMovies = async () => {
  const AUTH_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgyODliZWYxZTEzYTJiZjE5N2ZjMDZhZmUxMjMzNiIsInN1YiI6IjY1OWZlNDcxM2NkMTJjMDEyZGYwNjY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yA_qEgcZekO0ca6PfwxFIzMCuYarZwWINgSQqc-fQgI';

  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  const { data } = await axios.get('/trending/movie/day?language=en-US');
  return data.results;
};
