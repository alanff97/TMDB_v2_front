import { useEffect, useState } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('avengers');
  const [error, setError] = useState(null);

  useEffect(() => {
    /* if (isFirstInput.current) {
      isFirstInput.current = search === ''; // initial state of search "" so its true
      return;
    } */
    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }
    if (search.length < 2) {
      setError('La búsqueda debe tener al menos dos caracteres');
      return;
    }
    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}
