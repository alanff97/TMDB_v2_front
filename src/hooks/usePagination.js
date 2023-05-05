import { useEffect, useState } from 'react';

export function usePagination() {
  const [page, setPage] = useState(1);

  useEffect(() => {}, [page]);
  return { page, setPage };
}
