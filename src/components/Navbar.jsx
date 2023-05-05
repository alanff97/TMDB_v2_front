import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../state/user';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Tooltip,
  Avatar,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../hooks/useSearch';
import { useContent } from '../hooks/useContent';

import { customMessage } from '../utils/customMessage';

import { setMediaType } from '../state/mediaType';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mediaType = useSelector((state) => state.mediaType);
  const { search, updateSearch } = useSearch();
  const { getContent } = useContent({ search });
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleLogout = async (event) => {
    event.preventDefault();
    await axios.post('/api/user/logout', {});
    dispatch(logOut());
    customMessage('success', 'Session Ended');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getContent();
    updateSearch('');
    navigate(`/${mediaType}/search`);
  };
  const handleClickTv = (event) => {
    event.preventDefault();
    dispatch(setMediaType('tv'));
  };
  const handleClickMovie = (event) => {
    event.preventDefault();
    dispatch(setMediaType('movie'));
  };
  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 2 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/movie">
                <MenuItem onClick={handleClickMovie}>
                  <Typography textAlign="center">Movies</Typography>
                </MenuItem>
              </Link>
              <Link to="/tv">
                <MenuItem onClick={handleClickTv}>
                  <Typography textAlign="center">Tv Shows</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Box sx={{ mr: 1, flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '10px',
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                TMDB
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 6, display: { xs: 'none', md: 'flex' } }}>
            <Link
              to="/movie"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Movies
              </Button>
            </Link>
            <Link to="/tv" style={{ textDecoration: 'none', color: 'white' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                TV Shows
              </Button>
            </Link>
          </Box>
          <form onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={`Search ${mediaType}...`}
                value={search || ''}
                onChange={handleChange}
              />
            </Search>
          </form>

          <Box
            sx={{
              flexGrow: 0,
              marginLeft: '20px',
            }}
          >
            {user.email ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Favorites</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <Button color="inherit">Login</Button>
                  </Link>
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <Button color="inherit">Register</Button>
                  </Link>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, width: '50px', height: '50px' }}
                    >
                      <AccountCircleIcon
                        sx={{ color: 'white', width: '40px', height: '40px' }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link
                      to="/login"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <MenuItem>
                        <Typography textAlign="center">Login</Typography>
                      </MenuItem>
                    </Link>
                    <Link
                      to="/register"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <MenuItem>
                        <Typography textAlign="center">Register</Typography>
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
