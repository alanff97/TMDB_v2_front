import { useEffect, useState } from 'react';

export function usePagination() {
  const [page, setPage] = useState();

  useEffect(() => {}, [page]);
  return { page, setPage };
}
