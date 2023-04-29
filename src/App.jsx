import './App.css';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { Movie } from './components/Movies';
import Navbar from './components/NavBar';
function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };
  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div className="page">
      <main>
        <Movie movies={movies} />
      </main>
    </div>
  );
}

export default App;

{
  /* <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            value={search}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Search"
          />
          <button type="submit">Find</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>} */
}
