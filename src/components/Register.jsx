import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Input from '../commons/Input';
import { customMessage } from '../utils/customMessage';

export default function Register() {
  const initialFormState = {
    email: 'email@example.com',
    password: '******',
    name: 'name',
    lastname: 'lastName',
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const conditionalSubmit =
    formData.email !== '' &&
    formData.name !== '' &&
    formData.password.length > 6 &&
    formData.lastname !== '';

  const handleEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validEmail = handleEmail(formData.email);
    let response;

    if (validEmail) {
      try {
        response = await axios.post('/api/user/register', formData);
        customMessage('success', response.data);
        navigate('/login');
      } catch (error) {
        return customMessage('error', 'The email is already registered');
      }
    } else {
      return customMessage('error', 'The email is not valid');
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, flexDirection: 'column' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                required
                name="name"
                label="First Name"
                handleChange={handleChange}
                type="text"
                error={formData.name === ''}
                helperText={formData.name === '' && 'Required'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="lastname"
                label="Last Name"
                handleChange={handleChange}
                type="text"
                required
                error={formData.lastname === ''}
                helperText={formData.lastname === '' && 'Required'}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                name="email"
                label="Email Adress"
                handleChange={handleChange}
                type="email"
                error={formData.email === ''}
                helperText={formData.email === '' && 'Required'}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="password"
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                error={formData.password.length < 6}
                helperText={
                  formData.password.length < 6 &&
                  'The password must be at least 6 characters'
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!conditionalSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">{'Already have an account? Sign in'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
