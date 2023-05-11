import PropTypes from 'prop-types';

import Carousel from 'react-material-ui-carousel';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function ImageCarousel() {
  const trending = useSelector((state) => state.trending);
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 2,
          mb: 2,
          p: 2,
        }}
      >
        <Carousel>
          {trending?.map((content, i) => (
            <Card
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'flex-start',
                backgroundColor: '#f8f8ff',
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <CardActionArea sx={{ flexGrow: 2 }}>
                <CardMedia
                  sx={{
                    maxWidth: '100%',
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
                  [theme.breakpoints.down('md')]: {
                    m: 'auto',
                    maxWidth: '100%',
                  },
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
          ))}
        </Carousel>
      </Container>
    </ThemeProvider>
  );
}
ImageCarousel.propTypes = {
  trending: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      release: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  ),
};
export default ImageCarousel;
