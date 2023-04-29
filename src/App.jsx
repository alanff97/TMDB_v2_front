import './App.css';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { Movie } from './components/Movies';
import { useEffect } from 'react';

function App() {
  return (
    <div className="page">
      <main>
        <Movie movies={movies} />
      </main>
    </div>
  );
}

export default App;
