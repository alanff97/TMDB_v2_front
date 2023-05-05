import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../state/movies';
import { useLocation } from 'react-router-dom';

export function useMovies({ search }) {
  const responseMovie = useSelector((state) => state.movie || []);
  const dispatch = useDispatch();
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const imageBackPath = 'https://image.tmdb.org/t/p/original/';

  const movies = responseMovie || [];

  const getMovies = async () => {
    let action;
    try {
      const type = search ? 'search' : 'discover';
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/movie`,
        {
          params: {
            api_key: 'dc7502b948a402dc18b3f69635757182',
            language: 'en-US',
            query: search,
          },
        }
      );

      const mappedMovies = response.data.results?.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        image: movie.poster_path
          ? imagePath + movie.poster_path
          : '/public/404-poster.png',
        release: movie.release_date.split('-')[0],
        stars: movie.vote_average,
        backdrop_path: imageBackPath + movie.backdrop_path,
      }));

      action = setMovies(mappedMovies);
      dispatch(action);
    } catch (error) {
      return error;
    }
  };

  /*   useEffect(() => {
    getMovies();
  }, []); */

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      getMovies();
    }
  }, [location]);

  return { movies, getMovies };
}
