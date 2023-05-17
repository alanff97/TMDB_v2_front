import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/user';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import LockOpenIcon from '@mui/icons-material/LockOpen';

import Input from '../commons/Input';
import { customMessage } from '../utils/customMessage';
import { setFavorites } from '../state/favorites';

export default function Login() {
  const initialFormState = {
    email: '',
    password: '******',
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = handleEmail(formData.email);
    let cookie;

    if (validEmail) {
      try {
        cookie = await axios.post('api/user/login', formData);
        dispatch(setUser(cookie.data.user));
        const favorites = cookie.data.favorites.map((item) => ({
          ...item,
          id: item.mediaId,
        }));
        dispatch(setFavorites(favorites));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        customMessage('success', 'Session Started!');
        navigate('/');
      } catch (error) {
        return customMessage('error', 'Invalid credentials, please try again');
      }
    } else {
      customMessage('error', 'The email is not valid');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, flexDirection: 'column', width: '100%' }}
        >
          <Grid
            container
            spacing={2}
            sx={{ flexDirection: 'column', width: '100%' }}
          >
            <Grid item xs={12} sm={12}>
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
                error={formData.password.length < 6}
                helperText={
                  formData.password.length < 6 &&
                  'The password must be at least 6 characters'
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={formData.email === '' || formData.password.length < 6}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
