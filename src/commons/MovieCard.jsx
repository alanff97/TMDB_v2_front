import PropTypes from 'prop-types';

import { Box, CardActionArea } from '@mui/material';

export default function MovieCard({ content, onClick }) {
  return (
    <CardActionArea onClick={onClick}>
      <Box sx={{ maxWidth: 345, position: 'relative' }}>
        <Box
          component="img"
          src={content.image}
          alt={content.title || content.name}
          sx={{
            maxWidth: '100%',
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </Box>
    </CardActionArea>
  );
}

MovieCard.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    release: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
