import React from 'react';
import { Link } from 'react-router-dom';
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
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../hooks/useSearch';
import { useMovies } from '../hooks/useMovies';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const settings = ['Account', 'Favorites', 'Logout'];

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { search, updateSearch } = useSearch();
  const { getMovies } = useMovies({ search });
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
    navigate('/search');
  };
  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2, flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'block', sm: 'block' },
              }}
            >
              TMDB
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={search || ''}
                onChange={handleChange}
              />
            </Search>
          </form>

          <Box sx={{ flexGrow: 0, marginLeft: '20px' }}>
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
