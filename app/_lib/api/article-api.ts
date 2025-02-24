import { instance } from '../axios-instance';

// 게시글 작성
export const createArticle = async (data: {
  image?: string;
  content: string;
  title: string;
}) => {
  const response = await instance.post(`/articles`, data);
  return response.data;
};

// 게시글 목록 조회
export const getArticles = async (params: {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}) => {
  const response = await instance.get(`/articles`, { params });
  return response.data;
};

// 게시글 상세 조회
export const getArticlesById = async (articleId: number) => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.data;
};

// 게시글 수정
export const updateArticle = async (
  articleId: number,
  data: { image?: string | null; content?: string; title: string },
) => {
  const response = await instance.patch(`/articles/${articleId}`, data);
  return response.data;
};

// 게시글 삭제
export const deleteArticle = async (articleId: number) => {
  const response = await instance.delete(`/articles/${articleId}`);
  return response.status;
};
