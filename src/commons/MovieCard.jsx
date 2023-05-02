import PropTypes from 'prop-types';

import { Box } from '@mui/material';

export default function MovieCard({ movie }) {
  return (
    <Box sx={{ maxWidth: 345, position: 'relative' }}>
      <Box
        component="img"
        src={movie.image}
        alt={movie.title}
        sx={{
          maxWidth: '100%',
          maxHeight: 500,
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
