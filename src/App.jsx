import './App.css';

import { Movie } from './components/Movies';
import { useSelector } from 'react-redux';

function App() {
  const movies = useSelector((state) => state.movies);
  return (
    <div className="page">
      <main>
        <Movie movies={movies} />
      </main>
    </div>
  );
}

export default App;
