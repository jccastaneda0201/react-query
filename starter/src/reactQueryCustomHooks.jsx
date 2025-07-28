import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: createTaskLoading } = useMutation({
    mutationFn: (taskTittle) => customFetch.post('/', { title: taskTittle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, createTaskLoading };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { deleteTask, deleteTaskLoading };
};
