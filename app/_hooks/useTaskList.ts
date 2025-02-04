import {
  createTaskList,
  deleteTaskList,
  getTaskList,
  updateTaskList,
  updateTaskListOrder,
} from '@/_lib/api/tasklist-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOptimisticUpdate } from './useOptimisticUpdate';

export const useTaskList = (groupId: number, id: number, options = {}) => {
  const queryClient = useQueryClient();

  // 할 일 목록 조회
  const useGetTaskList = useQuery({
    queryKey: ['taskList', groupId, id],
    queryFn: () => getTaskList(groupId, id, ''),
    ...options,
  });

  // 할 일 목록 수정
  const useUpdateTaskList = useOptimisticUpdate({
    mutationFn: (data: { name: string }) => updateTaskList(groupId, id, data),
    queryKey: ['taskList', groupId, id],
    updater: (oldData, newData) => ({
      ...oldData,
      ...newData,
    }),
  });

  // 할 일 목록 삭제
  const useDeleteTaskList = useMutation({
    mutationFn: () => deleteTaskList(groupId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskList', groupId, id] });
    },
  });

  // 할 일 목록 생성
  const useCreateTaskList = useMutation({
    mutationFn: (data: { name: string }) => createTaskList(groupId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['taskList', groupId, data.id], data);
      queryClient.invalidateQueries({ queryKey: ['taskList', groupId] });
    },
  });

  // 할 일 목록 순서 변경
  const useUpdateTaskListOrder = useMutation({
    mutationFn: (data: { displayIndex: number }) =>
      updateTaskListOrder(groupId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskList', groupId] });
    },
  });

  return {
    useGetTaskList,
    useCreateTaskList,
    useUpdateTaskList,
    useDeleteTaskList,
    useUpdateTaskListOrder,
  };
};
