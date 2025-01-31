import { instance } from '../axios-instance';

// 게시글 좋아요
export const likeArticle = async (articleId: number) => {
  const response = await instance.post(`/articles/${articleId}/like`);
  return response.data;
};

// 게시글 좋아요 취소
export const deleteLikeArticle = async (articleId: number) => {
  const response = await instance.delete(`/articles/${articleId}/like`);
  return response.data;
};
