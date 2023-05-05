import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Movie } from './components/Movies';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setMediaType } from './state/mediaType';
import ContentModal from './commons/ContentModal';

function App() {
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
          <Route path="/" element={<Movie content={content} />} />
          <Route path="/movie/search" element={<Movie content={content} />} />
          <Route path="/tv/search" element={<Movie content={content} />} />
          <Route path="/movie" element={<Movie content={content} />} />
          <Route path="/tv" element={<Movie content={content} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
