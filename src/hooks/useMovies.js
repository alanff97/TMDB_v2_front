import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../state/movies';

export function useMovies({ search }) {
  const responseMovie = useSelector((state) => state.movie || []);
  const dispatch = useDispatch();
  const imagePath = 'https://image.tmdb.org/t/p/w500/';

  const movies = responseMovie || [];

  const getMovies = async () => {
    let action;
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
        const mappedMovies = response.data.results?.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          image: movie.poster_path
            ? imagePath + movie.poster_path
            : '/public/404-poster.png',
          release: movie.release_date.split('-')[0],
          stars: movie.vote_average,
        }));

        action = setMovies(mappedMovies);
        dispatch(action);
      } else {
        action = setMovies([]);
        dispatch(action);
      }
    } catch (error) {
      return error;
    }
  };

  return { movies, getMovies };
}
