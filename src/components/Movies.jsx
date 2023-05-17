import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import MovieCard from '../commons/MovieCard';
import ImageCarousel from './ImageCarousel';

// eslint-disable-next-line
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function ListOfMovies({ content, onClick }) {
  const location = useLocation();
  const containSearch = location.pathname.includes('/search');
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {containSearch ? null : <ImageCarousel onClick={onClick} />}
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
            sx={{ margin: 0 }}
          >
            {content?.map((content) => (
              <Grid xs={2} sm={4} md={4} key={content.id}>
                <MovieCard content={content} onClick={() => onClick(content)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

ListOfMovies.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      release: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
    })
  ).isRequired,
  trending: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      release: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
};

export function NoMoviesResult() {
  return <p>No se encontraron películas</p>;
}

export function Movie({ content, onClick }) {
  const hasMovies = content?.length > 0;
  return hasMovies ? (
    <ListOfMovies content={content} onClick={onClick} />
  ) : (
    <NoMoviesResult />
  );
}

Movie.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      release: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func,
};
