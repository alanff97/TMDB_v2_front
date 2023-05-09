import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '../state/favorites';
import { customMessage } from '../utils/customMessage';

export default function ContentModal({ content, onClose }) {
  const dispatch = useDispatch();
  const { breakpoints } = useTheme();
  const isMd = useMediaQuery(breakpoints.up('md'));
  const user = useSelector((state) => state.user);
  const favoritesState = useSelector((state) => state.favorites);

  const handleAddFav = async (e) => {
    e.preventDefault();

    if (!user.id)
      return customMessage('error', 'You need to login into your Account');
    try {
      const response = await axios.post('/api/favorites/add', {
        mediaId: content.id,
        type: content.type,
      });
      const favorites = await axios.get('/api/favorites/', {});
      dispatch(setFavorites(favorites.data));
      return customMessage('success', response.data);
    } catch (error) {
      return customMessage('error', error.response.data);
    }
  };
  const handleRemoveFav = async (e) => {
    e.preventDefault();
    if (!user.id)
      return customMessage('error', 'You need to login into your Account');

    try {
      const response = await axios.delete('/api/favorites/delete', {
        params: {
          mediaId: content.id,
        },
      });
      const favorites = await axios.get('/api/favorites/', {});
      dispatch(setFavorites(favorites.data));
      return customMessage('success', response.data);
    } catch (error) {
      return customMessage('error', error.response.data);
    }
  };
  const isFavorite = (mediaId) => {
    return favoritesState.some((favorite) => favorite.mediaId === mediaId);
  };

  return (
    <>
      {content ? (
        <Modal
          open={Boolean(content)}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ width: '100%', height: '100%' }}
        >
          <Grid
            container
            sx={{
              position: 'absolute',
              backgroundColor: 'grey.800',
              top: '50%',
              left: '50%',
              height: '80%',
              width: '80%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              border: '2px solid #000',
              boxShadow: 50,
            }}
          >
            <img
              src={isMd ? content.backdrop_path : content.image}
              alt={content.title || content.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.5,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                textAlign: 'left',
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                sx={{ mr: 2, ml: 1 }}
                gutterBottom
              >
                {content.title || content.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="inherit"
                paragraph
                sx={{ mr: 2, ml: 1 }}
              >
                {content.overview}
              </Typography>
              <Box>
                {isFavorite(content.id) ? (
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={handleRemoveFav}
                  >
                    Remove From Favorites
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={handleAddFav}
                  >
                    Add To Favorites
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Modal>
      ) : null}
    </>
  );
}
ContentModal.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    overview: PropTypes.string,
    release: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    image: PropTypes.string.isRequired,
    type: PropTypes.string,
    // otras propiedades aquí
  }),
  onClose: PropTypes.func,
};
