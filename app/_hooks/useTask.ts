import {
  createTasks,
  deleteTask,
  deleteTaskRecurring,
  getTaskById,
  getTasksByDate,
  updateTask,
  updateTaskOrder,
} from '@lib/api/task-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTask = (groupId: number, taskListId: number, options = {}) => {
  const queryClient = useQueryClient();

  // 반복 일정 할 일 생성
  const useCreateTask = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      startDate: string;
      frequencyType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
      monthDay?: number;
    }) => createTasks(groupId, taskListId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });
    },
  });

  // 특정 일자의 할 일 목록 조회
  const useGetTaskByDate = (date: string) =>
    useQuery({
      queryKey: ['tasks', groupId, taskListId, date],
      queryFn: () => getTasksByDate(groupId, taskListId, date),
      ...options,
    });

  // 할 일 조회
  const useGetTaskById = (taskId: number) =>
    useQuery({
      queryKey: ['task', groupId, taskListId, taskId],
      queryFn: () => getTaskById(groupId, taskListId, taskId),
      ...options,
    });

  // 할 일 수정
  const useUpdateTask = useMutation({
    mutationFn: (data: {
      taskId: number;
      payload: { name?: string; description?: string; done?: boolean };
    }) => updateTask(groupId, taskListId, data.taskId, data.payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['task', groupId, taskListId, variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });
    },
  });

  // 할 일 삭제
  const useDeleteTask = useMutation({
    mutationFn: (taskId: number) => deleteTask(groupId, taskListId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });
    },
  });

  // 할 일 순서 변경
  const useUpdateTaskOrder = useMutation({
    mutationFn: (data: { taskId: number; displayIndex: number }) =>
      updateTaskOrder(groupId, taskListId, data.taskId, {
        displayIndex: data.displayIndex,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });
    },
  });

  // 반복 할 일 삭제
  const useDeleteTaskRecurring = useMutation({
    mutationFn: (data: { taskId: number; recurringId: number }) =>
      deleteTaskRecurring(groupId, taskListId, data.taskId, data.recurringId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });
    },
  });

  return {
    useCreateTask,
    useGetTaskById,
    useGetTaskByDate,
    useUpdateTask,
    useDeleteTask,
    useUpdateTaskOrder,
    useDeleteTaskRecurring,
  };
};
