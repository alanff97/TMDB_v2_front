import { useEffect, useState } from 'react';

export function useModal() {
  const [modal, setModal] = useState();

  useEffect(() => {}, [modal]);
  return { modal, setModal };
}
