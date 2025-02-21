import {
  createArticleComment,
  deleteArticleComment,
  getArticleComment,
  updateArticleComment,
} from '@lib/api/article-comment-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useArticleComment = (options = {}) => {
  const queryClient = useQueryClient();

  // 게시글의 댓글 작성
  const useCreateArticleComment = useMutation({
    mutationFn: (data: { articleId: number; content: string }) =>
      createArticleComment(data.articleId, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments'],
      });
    },
  });

  // 게시글의 댓글 목록 조회
  const useGetArticleComment = (
    articleId: number,
    params: { limit: number; cursor?: number },
  ) =>
    useQuery({
      queryKey: ['articleComments', articleId, params],
      queryFn: () => getArticleComment(articleId, params),
      ...options,
    });

  // 게시글의 댓글 수정
  const useUpdateArticleComment = useMutation({
    mutationFn: (data: { commentId: number; content: string }) =>
      updateArticleComment(data.commentId, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments'],
      });
    },
  });

  // 게시글의 댓글 삭제
  const useDeleteArticleComment = useMutation({
    mutationFn: (commentId: number) => deleteArticleComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments'],
      });
    },
  });

  return {
    useCreateArticleComment,
    useGetArticleComment,
    useUpdateArticleComment,
    useDeleteArticleComment,
  };
};
