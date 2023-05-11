import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../state/content';
import { useLocation } from 'react-router-dom';
import { setTrending } from '../state/trending';
import { customMessage } from '../utils/customMessage';

export function useContent({ search }) {
  const responseContent = useSelector((state) => state.movie || []);
  const mediaType = useSelector((state) => state.mediaType);
  const dispatch = useDispatch();
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const imageBackPath = 'https://image.tmdb.org/t/p/original/';

  const content = responseContent || [];

  const getContent = async () => {
    let action, actionTrend;
    try {
      const type = search ? 'search' : 'discover';
      const media = mediaType === 'search' ? '' : mediaType;
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
      const trendResponse = await axios.get(
        `https://api.themoviedb.org/3/trending/${media}/week`,
        {
          params: {
            api_key: 'dc7502b948a402dc18b3f69635757182',
            language: 'en-US',
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
          backdrop_path: shows.backdrop_path
            ? imageBackPath + shows.backdrop_path
            : '/public/NotFoundBack.png',
          type: 'tv',
        }));
        const trendShows = trendResponse.data.results?.map((shows) => ({
          id: shows.id,
          name: shows.name,
          overview: shows.overview,
          image: shows.poster_path
            ? imagePath + shows.poster_path
            : '/public/404-poster.png',
          release: shows.first_air_date.split('-')[0],
          stars: shows.vote_average,
          backdrop_path: shows.backdrop_path
            ? imageBackPath + shows.backdrop_path
            : '/public/NotFoundBack.png',
          type: 'tv',
        }));

        actionTrend = setTrending(trendShows);
        dispatch(actionTrend);
        action = setContent(mappedShows);
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
          type: 'movie',
        }));
        const trendMovies = trendResponse.data.results?.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          image: movie.poster_path
            ? imagePath + movie.poster_path
            : '/public/404-poster.png',
          release: movie.release_date.split('-')[0],
          stars: movie.vote_average,
          backdrop_path: movie.backdrop_path
            ? imageBackPath + movie.backdrop_path
            : '/public/NotFoundBack.png',
          type: 'movie',
        }));

        actionTrend = setTrending(trendMovies);
        dispatch(actionTrend);
        action = setContent(mappedMovies);
        dispatch(action);
      }
    } catch (error) {
      return customMessage('error', error.response.data);
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
      getContent();
    }
  }, [mediaType, location]);

  return { content, getContent };
}
