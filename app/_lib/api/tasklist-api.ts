import { instance } from '../axios-instance';

// 할 일 목록 조회
export const getTaskList = async (
  groupId: number,
  id: number,
  date: string,
) => {
  const response = await instance.get(`/groups/${groupId}/task-lists/${id}`, {
    params: date,
  });
  return response.data;
};

// 할 일 목록 수정
export const updateTaskList = async (
  groupId: number,
  id: number,
  data: { name: string },
) => {
  const response = await instance.patch(
    `/groups/${groupId}/task-lists/${id}`,
    data,
  );
  return response.data;
};

// 할 일 목록 삭제
export const deleteTaskList = async (groupId: number, id: number) => {
  const response = await instance.delete(`/groups/${groupId}/task-lists/${id}`);
  return response.status;
};

// 할 일 목록 생성
export const createTaskList = async (
  groupId: number,
  data: { name: string },
) => {
  const response = await instance.post(`/groups/${groupId}/task-lists`, data);
  return response.data;
};

// 할 일 목록 순서 변경
export const updateTaskListOrder = async (
  groupId: number,
  id: number,
  data: { displayIndex: number },
) => {
  const response = await instance.patch(
    `/groups/${groupId}/task-lists/${id}/order`,
    data,
  );
  return response.status;
};
