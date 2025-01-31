import { instance } from '../axios-instance';

// 할 일 댓글 조회
export const getComments = async (taskId: number) => {
  const response = await instance.get(`/tasks/${taskId}/comments`);
  return response.data;
};

// 할 일 댓글 작성
export const createComment = async (
  taskId: number,
  data: { content: string },
) => {
  const response = await instance.post(`/tasks/${taskId}/comments`, data);
  return response.data;
};

// 할 일 댓글 수정
export const updateComment = async (
  taskId: number,
  commentId: number,
  data: { content: string },
) => {
  const response = await instance.patch(
    `/tasks/${taskId}/comments/${commentId}`,
    data,
  );
  return response.data;
};

// 할 일 댓글 삭제
export const deleteComment = async (taskId: number, commentId: number) => {
  const response = await instance.delete(
    `/tasks/${taskId}/comments/${commentId}`,
  );
  return response.status;
};
