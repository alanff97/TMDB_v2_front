import './App.css';
import Login from './components/Login';
import { Movie } from './components/Movies';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

function App() {
  const movies = useSelector((state) => state.movies);
  return (
    <div className="page">
      <main>
        <Routes>
          <Route path="/" element={<Movie movies={movies} />} />
          <Route path="/search" element={<Movie movies={movies} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
