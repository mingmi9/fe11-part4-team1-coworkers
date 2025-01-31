import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/_lib/api/comment-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useComment = (taskId: number, options = {}) => {
  const queryClient = useQueryClient();

  // 할 일 댓글 조회
  const useGetComments = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getComments(taskId),
    ...options,
  });

  // 할 일 댓글 작성
  const useCreateComment = useMutation({
    mutationFn: (data: { content: string }) => createComment(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  // 할 일 댓글 수정
  const useUpdateComment = useMutation({
    mutationFn: (data: { commentId: number; content: string }) =>
      updateComment(taskId, data.commentId, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  // 할 일 댓글 삭제
  const useDeleteComment = useMutation({
    mutationFn: (commentId: number) => deleteComment(taskId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  return {
    useGetComments,
    useCreateComment,
    useUpdateComment,
    useDeleteComment,
  };
};
