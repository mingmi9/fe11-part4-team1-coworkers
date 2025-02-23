import { Article, Comment } from '@/(routes)/articles/type/Articles';
import {
  createArticleComment,
  deleteArticleComment,
  getArticleComment,
  updateArticleComment,
} from '@lib/api/article-comment-api';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface CommentResponse {
  list: Comment[];
}
export const useArticleComment = () => {
  const queryClient = useQueryClient();

  // 게시글의 댓글 목록 조회
  const useGetArticleComment = (
    articleId: number,
    params: { limit: number; cursor?: number, article:Article },
  ) =>
    useInfiniteQuery<CommentResponse>({
      queryKey: ['articleComments', articleId],
      queryFn: ({ pageParam = 0 }) =>
        getArticleComment(articleId, {
          limit: params.limit,
          cursor: pageParam as number,
        }),
      getNextPageParam: (lastPage: CommentResponse, allPages: CommentResponse[]) => {
        const totalCommentsCount = params.article?.commentCount || 0; 
        const loadedCommentsCount =  allPages.reduce((acc, page) => acc + page.list.length, 0);

        if (loadedCommentsCount >= totalCommentsCount) {
          return undefined;  
        }

        const lastCommentId = lastPage?.list?.[lastPage.list.length - 1]?.id;
        console.log(lastCommentId);
        return lastCommentId || null; 
      },
      initialPageParam: 0,
    });

  // 게시글의 댓글 작성
  const useCreateArticleComment = useMutation({
    mutationFn: (data: { articleId: number; content: string }) =>
      createArticleComment(data.articleId, { content: data.content }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments', variables.articleId],
      });
    },
  });

  // 게시글의 댓글 수정
  const useUpdateArticleComment = useMutation({
    mutationFn: (data: {
      commentId: number;
      articleId: number;
      content: string;
    }) => updateArticleComment(data.commentId, { content: data.content }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments', variables.articleId],
      });
    },
  });

  // 게시글의 댓글 삭제
  const useDeleteArticleComment = useMutation({
    mutationFn: (data: { commentId: number; articleId: number }) =>
      deleteArticleComment(data.commentId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments', variables.articleId],
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
