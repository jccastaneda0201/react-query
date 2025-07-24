import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

export const useFetchTask = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });

  return { isPending, data, isError };
};
