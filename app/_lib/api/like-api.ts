import { instance } from '../axios-instance';

// API 요청 공통
const sendLikeRequest = async (
  articleId: number,
  token: string,
  method: 'post' | 'delete',
) => {
  try {
    const response = await instance({
      method,
      url: `/articles/${articleId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Like request failed', error);
    throw error;
  }
};

// 게시글 좋아요
export const likeArticle = (articleId: number, token: string) => {
  return sendLikeRequest(articleId, token, 'post');
};

// 게시글 좋아요 취소
export const deleteLikeArticle = (articleId: number, token: string) => {
  return sendLikeRequest(articleId, token, 'delete');
};
