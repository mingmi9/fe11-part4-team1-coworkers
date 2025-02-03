import { instance } from '../axios-instance';

// 반복 일정 할 일 생성
export const createTasks = async (
  groupId: number,
  taskListId: number,
  data: {
    name: string;
    description: string;
    startDate: string;
    frequencyType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    monthDay?: number;
  },
) => {
  const response = await instance.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );
  return response.data;
};

// 특정 일자의 할 일 목록 조회
export const getTasksByDate = async (
  groupId: number,
  taskListId: number,
  date: string,
) => {
  const response = await instance.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    { params: { date } },
  );
  return response.data;
};

// 할 일 조회
export const getTaskById = async (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  const response = await instance.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
  return response.data;
};

// 할 일 수정
export const updateTask = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: { name?: string; description?: string; done?: boolean },
) => {
  const response = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );
  return response.data;
};

// 할 일 삭제
export const deleteTask = async (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  const response = await instance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
  return response.status;
};

// 할 일 순서 변경
export const updateTaskOrder = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: { displayIndex: number },
) => {
  const response = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
    data,
  );
  return response.status;
};

// 반복 할 일 삭제
export const deleteTaskRecurring = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  const response = await instance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );
  return response.status;
};
