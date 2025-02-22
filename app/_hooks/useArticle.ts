import {
  createArticle,
  deleteArticle,
  getArticles,
  getArticlesById,
  updateArticle,
} from '@/_lib/api/article-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useArticle = (options = {}) => {
  const queryClient = useQueryClient();

  // 게시글 작성
  const useCreateArticle = useMutation({
    mutationFn: (data: { image?: string; content: string; title: string }) =>
      createArticle(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['article', data.id], data);
    },
  });

  // 게시글 목록 조회
  const useGetArticles = (params: {
    page?: number;
    pageSize?: number;
    orderBy?: 'recent' | 'like';
    keyword?: string;
  }) =>
    useQuery({
      queryKey: ['articles', params],
      queryFn: () => getArticles(params),
      ...options,
    });

  // 게시글 상세 조회
  const useGetArticlesById = (articleId: number) =>
    useQuery({
      queryKey: ['article', articleId],
      queryFn: () => getArticlesById(articleId),
      ...options,
    });

  // 게시글 수정
  const useUpdateArticle = useMutation({
    mutationFn: (data: {
      articleId: number;
      payload: { image?: string; content?: string; title: string };
    }) => updateArticle(data.articleId, data.payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['article', data.articleId],
      });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  // 게시글 삭제
  const useDeleteArticle = useMutation({
    mutationFn: (articleId: number) => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  return {
    useCreateArticle,
    useGetArticles,
    useGetArticlesById,
    useUpdateArticle,
    useDeleteArticle,
  };
};
