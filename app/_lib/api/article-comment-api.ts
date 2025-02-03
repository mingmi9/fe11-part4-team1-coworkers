import { instance } from '../axios-instance';

// 게시글의 댓글 작성
export const createArticleComment = async (
  articleId: number,
  data: { content: string },
) => {
  const response = await instance.post(`/articles/${articleId}/comments`, data);
  return response.data;
};

// 게시글의 댓글 목록 조회
export const getArticleComment = async (
  articleId: number,
  params: { limit: number; cursor?: number },
) => {
  const response = await instance.get(`/articles/${articleId}/comments`, {
    params,
  });
  return response.data;
};

// 게시글의 댓글 수정
export const updateArticleComment = async (
  commentId: number,
  data: { content: string },
) => {
  const response = await instance.patch(`/comments/${commentId}`, data);
  return response.data;
};

// 게시글의 댓글 삭제
export const deleteArticleComment = async (commentId: number) => {
  const response = await instance.delete(`/comments/${commentId}`);
  return response.data;
};
