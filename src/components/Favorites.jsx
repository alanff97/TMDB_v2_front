import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customMessage } from '../utils/customMessage';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import MovieCard from '../commons/MovieCard';

const Favorites = ({ onClick }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const [type, setType] = useState('movie');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    if (!user.id) {
      customMessage('error', 'You need to login');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const moviesArray = favorites.filter((item) => item.type === 'movie');
    const tvShowsArray = favorites.filter((item) => item.type === 'tv');

    setMovies(moviesArray);
    setTvShows(tvShowsArray);
  }, [favorites]);

  return (
    <div>
      {user ? (
        <div>
          <Container>
            <Box>
              <FormControl sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="select-type-content">Content Type</InputLabel>
                <Select
                  labelId="select-type-content"
                  id="select-type-content"
                  value={type}
                  label="Type Content"
                  onChange={handleChange}
                >
                  <MenuItem value="movie">Movies</MenuItem>
                  <MenuItem value="tv">Tv Shows</MenuItem>
                </Select>
                <FormHelperText>Select your content type</FormHelperText>
              </FormControl>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 16 }}
                sx={{ margin: 0 }}
              >
                {type === 'movie'
                  ? movies.map((item) => (
                      <Grid xs={2} sm={4} md={4} key={item.id} item>
                        <MovieCard
                          content={item}
                          onClick={() => onClick(item)}
                        />
                      </Grid>
                    ))
                  : tvShows.map((item) => (
                      <Grid xs={2} sm={4} md={4} key={item.id} item>
                        <MovieCard
                          content={item}
                          onClick={() => onClick(item)}
                        />
                      </Grid>
                    ))}
              </Grid>
            </Box>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

Favorites.propTypes = {
  onClick: PropTypes.func,
};

export default Favorites;
