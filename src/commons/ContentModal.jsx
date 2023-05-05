import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, useMediaQuery } from '@mui/material';

import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ content, onClose }) {
  const { breakpoints } = useTheme();
  const isMd = useMediaQuery(breakpoints.up('md'));

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
    // otras propiedades aquí
  }),
  onClose: PropTypes,
};
