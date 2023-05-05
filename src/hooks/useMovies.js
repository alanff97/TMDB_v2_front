import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../state/movies';
import { useLocation } from 'react-router-dom';

export function useMovies({ search }) {
  const responseMovie = useSelector((state) => state.movie || []);
  const mediaType = useSelector((state) => state.mediaType);
  const dispatch = useDispatch();
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const imageBackPath = 'https://image.tmdb.org/t/p/original/';

  const movies = responseMovie || [];

  const getMovies = async () => {
    let action;
    try {
      const type = search ? 'search' : 'discover';
      const media = mediaType === 'search' ? 'tv' : mediaType;
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${media}`,
        {
          params: {
            api_key: 'dc7502b948a402dc18b3f69635757182',
            language: 'en-US',
            query: search,
          },
        }
      );

      if (media === 'tv') {
        const mappedShows = response.data.results?.map((shows) => ({
          id: shows.id,
          name: shows.name,
          overview: shows.overview,
          image: shows.poster_path
            ? imagePath + shows.poster_path
            : '/public/404-poster.png',
          release: shows.first_air_date.split('-')[0],
          stars: shows.vote_average,
          backdrop_path: imageBackPath + shows.backdrop_path,
        }));
        action = setMovies(mappedShows);
        dispatch(action);
      } else {
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
      }
    } catch (error) {
      return error;
    }
  };

  /* useEffect(() => {
    getMovies();
  }, []); */

  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/movie' ||
      location.pathname === '/tv'
    ) {
      getMovies();
    }
  }, [mediaType, location]);

  return { movies, getMovies };
}
