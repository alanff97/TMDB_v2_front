import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Movie } from './components/Movies';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setMediaType } from './state/mediaType';
import ContentModal from './commons/ContentModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Created by '}
      <Link color="inherit" href="https://github.com/alanff97">
        Alan Figueroa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  const [selectedContent, setSelectedContent] = useState(null);
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const validPaths = ['movie', 'tv'];
    const path = location.pathname.slice(1);
    if (validPaths.includes(path)) {
      dispatch(setMediaType(path));
    }
  }, [location]);

  return (
    <div className="page">
      <main>
        <Routes>
          <Route
            path="/"
            element={<Movie content={content} onClick={setSelectedContent} />}
          />
          <Route
            path="/movie/search"
            element={<Movie content={content} onClick={setSelectedContent} />}
          />
          <Route
            path="/tv/search"
            element={<Movie content={content} onClick={setSelectedContent} />}
          />
          <Route
            path="/movie"
            element={<Movie content={content} onClick={setSelectedContent} />}
          />
          <Route
            path="/tv"
            element={<Movie content={content} onClick={setSelectedContent} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <ContentModal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
      />
      <Box
        sx={{ bgcolor: 'background.paper', pt: 6, pb: 6, width: '100%' }}
        component="footer"
      >
        <Typography variant="h6" align="center" gutterBottom>
          TMDB Proyect
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
    </div>
  );
}

export default App;
