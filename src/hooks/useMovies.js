import { useState } from 'react';
// import discoverMovie from '../mocks/discover-movie.json';
import axios from 'axios';

export function useMovies({ search }) {
  const [responseMovie, setResponseMovie] = useState([]);
  const imagePath = 'https://image.tmdb.org/t/p/w500/';

  const movies = responseMovie.results || [];

  const mappedMovies = movies?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    image: imagePath + movie.poster_path,
    release: movie.release_date.split('-')[0],
    stars: movie.vote_average,
  }));

  const getMovies = async () => {
    try {
      if (search) {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: 'dc7502b948a402dc18b3f69635757182',
              language: 'en-US',
              query: search,
            },
          }
        );
        setResponseMovie(response.data);
      } else {
        setResponseMovie([]);
      }
    } catch (error) {
      return error;
    }
  };

  return { movies: mappedMovies, getMovies };
}
