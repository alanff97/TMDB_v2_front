import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Movie } from './components/Movies';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setMediaType } from './state/mediaType';

function App() {
  const movies = useSelector((state) => state.movies);
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
          <Route path="/" element={<Movie movies={movies} />} />
          <Route path="/movie/search" element={<Movie movies={movies} />} />
          <Route path="/tv/search" element={<Movie movies={movies} />} />
          <Route path="/movie" element={<Movie movies={movies} />} />
          <Route path="/tv" element={<Movie movies={movies} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
