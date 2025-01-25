import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

interface UseOptimisticUpdateOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: QueryKey;
  updater: (oldData: TData | undefined, newData: TVariables) => TData;
}

export const useOptimisticUpdate = <TData, TVariables>({
  mutationFn,
  queryKey,
  updater,
}: UseOptimisticUpdateOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (oldData) =>
        updater(oldData, newData),
      );

      return { previousData };
    },
    onError: (error, newData, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutation;
};
