import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customMessage } from '../utils/customMessage';
import { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import MovieCard from '../commons/MovieCard';

const Favorites = ({ onClick }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.id) {
      customMessage('error', 'You need to login');
      navigate('/login');
    }
  }, [user, navigate]);

  const example = [
    { title: 'title1', id: 123 },
    { title: 'title2', id: 124 },
    { title: 'title3', id: 125 },
    { title: 'title4', id: 126 },
    { title: 'title6', id: 127 },
    { title: 'title7', id: 128 },
  ];

  return (
    <div>
      {user ? (
        <div>
          <Container>
            <Box>
              <Typography>Titulo</Typography>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 16 }}
                sx={{ margin: 0 }}
              >
                {example?.map((item) => (
                  <Grid xs={2} sm={4} md={4} key={item.id} item>
                    <MovieCard content={item} onClick={() => onClick(item)} />
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
