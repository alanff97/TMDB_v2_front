import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../commons/MovieCard';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Container } from '@mui/material';
// eslint-disable-next-line
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function ListOfMovies({ content, onClick }) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            mb: 2,
            p: 2,
          }}
        >
          <Carousel>
            {content.map((content, i) => (
              <>
                <Card
                  key={i}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    backgroundColor: '#f8f8ff',
                    borderRadius: '10px',
                  }}
                >
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardMedia
                      sx={{
                        maxWidth: '100vh',
                        maxHeight: '100vh',
                        objectFit: 'cover',
                      }}
                      component="img"
                      image={content.backdrop_path}
                      alt={content.title || content.name}
                    />
                  </CardActionArea>
                  <CardContent
                    sx={{
                      flexGrow: 0,
                      flexShrink: 0,
                      maxWidth: '40%',
                      m: '7vh auto',
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {content.title || content.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {content.overview}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ))}
          </Carousel>
        </Container>
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
      release: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
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
