import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState(new URLSearchParams(search));

  useEffect(() => {
    setQueryParams(new URLSearchParams(search));
  }, [search]);

  return queryParams;
};

export default useQuery;
