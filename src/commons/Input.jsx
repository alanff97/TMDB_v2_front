import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton, Grid } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({
  name,
  half,
  label,
  handleChange,
  type,
  handleShowPassword,
  defaultValue,
  error,
  helperText,
}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        type={type}
        defaultValue={defaultValue}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        error={error}
        helperText={helperText}
      />
    </Grid>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  half: PropTypes.bool,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  handleShowPassword: PropTypes.func,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.any,
};

export default Input;
