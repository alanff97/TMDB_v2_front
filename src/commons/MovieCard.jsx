import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          mt: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
        }}
        title={movie.title}
        subheader={movie.release}
        maxLines={2}
      />
      <CardMedia
        component="img"
        image={movie.image}
        alt={movie.title}
        sx={{ maxWidth: '100%', maxHeight: 500, objectFit: 'cover' }}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
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
